import { messages } from '#/common/constants/messages';
import { GuildItem } from '#/common/types/Guild';
import { prisma } from '@/lib/prisma';
import { addToDate } from '@/utils/dateHelper';
import { saveFileFromUrl } from '@/utils/fileHelper';
import { detectLanguage } from '@/utils/languageHelper';
import { isDiscordError } from '@/utils/typeNarrower';
import { Guild as GuildData } from '@prisma/client';
import axios from 'axios';
import {
  Client,
  Collection,
  Guild,
  Message,
  NonThreadGuildBasedChannel,
  TextChannel,
} from 'discord.js';
import { Configuration, OpenAIApi } from 'openai';
import { ChannelRepository } from './ChannelRepository';

export class GuildRepository {
  static async format(guildData: GuildData) {
    const channelItems = await ChannelRepository.getByGuildId(guildData.id);
    const guildItem: GuildItem = {
      id: guildData.id,
      discordId: guildData.discordId,
      name: guildData.name,
      isPrivate: guildData.isPrivate,
      inProgress: guildData.inProgress,
      iconURL: guildData.iconURL,
      createdByUserId: guildData.createdByUserId,
      availableChannelCnt: guildData.availableChannelCnt ?? 0,
      createdChannelCnt: channelItems.length,
      lastSyncedAt: guildData.lastSyncedAt,
      channels: channelItems,
    };
    return guildItem;
  }

  static async getById(guildId: number) {
    const guildData = await prisma.guild.findUnique({
      where: {
        id: guildId,
      },
      include: {
        channels: {
          include: {
            channelSummaries: true,
          },
        },
      },
    });
    if (!guildData) throw new Error('Guild not found');

    return await this.format(guildData);
  }

  static async getByUserId(userId: number) {
    const guildDataList = await prisma.guild.findMany({
      where: {
        createdByUserId: userId,
      },
      include: {
        channels: {
          include: {
            channelSummaries: true,
          },
        },
      },
    });
    if (guildDataList.length === 0)
      throw new Error('Guild associated to user not found');

    const guildItems = await Promise.all(
      guildDataList.map(async (guildData) => {
        return await this.format(guildData);
      })
    );
    return guildItems;
  }

  static async fetchInfo(discordId: string, createdByUserId: number) {
    const bot = new Client({
      intents: [
        'Guilds',
        'GuildMessages',
        'GuildMessageReactions',
        'MessageContent',
        'GuildPresences',
      ],
    });
    await bot.login(process.env.DISCORD_BOT_TOKEN);

    // Fetch Guild Info
    const cachedGuilds = bot.guilds.cache;
    const fetchedGuild = await cachedGuilds.get(discordId)?.fetch();
    if (!fetchedGuild) {
      throw new Error(messages.botNotInstalled);
    } else if (!fetchedGuild.available) {
      throw new Error('Guild is not available');
    }

    const guildData = await prisma.guild.upsert({
      where: {
        discordId: fetchedGuild.id,
      },
      create: {
        discordId: fetchedGuild.id,
        name: fetchedGuild.name,
        isPrivate: false,
        inProgress: true,
        iconURL: fetchedGuild.iconURL(),
        createdByUser: {
          connect: {
            id: createdByUserId,
          },
        },
      },
      update: {
        name: fetchedGuild.name,
        iconURL: fetchedGuild.iconURL(),
      },
    });

    // Execute async tasks
    this.generateGuildData({
      fetchedGuild: fetchedGuild,
      guildData: guildData,
      createdByUserId,
    });

    return guildData.id;
  }

  static async generateGuildData(props: {
    fetchedGuild: Guild;
    guildData: GuildData;
    createdByUserId: number;
  }) {
    const openAiApi = new OpenAIApi(
      new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      })
    );

    // Generate channels data
    const fetchedChannels = await props.fetchedGuild.channels.fetch();
    await this.generateChannelsData({
      guildId: props.guildData.id,
      channels: fetchedChannels.values(),
    });

    // Generate description
    const channels = await prisma.channel.findMany({
      where: {
        guildId: props.guildData.id,
      },
      include: {
        channelSummaries: true,
      },
    });
    const materialsForDescription = JSON.stringify(
      channels.map((channel) => {
        return {
          name: channel.name,
          summary: channel.channelSummaries.map((summary) => {
            return summary.content;
          }),
        };
      })
    );
    const languageName = await detectLanguage(materialsForDescription);
    const prompt = `-Create description of Discord server using following channel data. 
-Describe in bullet points.
-Describe only in ${languageName}.
-Describe in 100 words at most.

Channel data:
${materialsForDescription}

Description:
`;
    const openAiResponse = await openAiApi.createCompletion({
      model: 'text-davinci-003',
      prompt,
      temperature: 0.2,
      max_tokens: 1024,
    });
    const summary = openAiResponse.data.choices[0].text;
    if (!summary) return;

    await prisma.guild.update({
      where: {
        id: props.guildData.id,
      },
      data: {
        inProgress: false,
        lastSyncedAt: new Date(),
      },
    });
  }

  static async generateChannelsData(props: {
    guildId: number;
    channels: IterableIterator<NonThreadGuildBasedChannel | null>;
  }) {
    const availableChannels: TextChannel[] = [];
    for (const channel of props.channels) {
      if (
        !channel ||
        !channel.isTextBased() ||
        channel.isThread() ||
        channel.isVoiceBased() ||
        !channel.viewable
      ) {
        continue;
      }
      const textChannel = channel as TextChannel;
      availableChannels.push(textChannel);
    }
    await prisma.guild.update({
      where: {
        id: props.guildId,
      },
      data: {
        availableChannelCnt: availableChannels.length,
      },
    });

    for (const channel of availableChannels) {
      // Save channel data to database
      const data = {
        discordId: channel.id,
        name: channel.name,
        topic: channel.topic,
        guildId: props.guildId,
      };
      const channelData = await prisma.channel.upsert({
        where: {
          guildId_discordId: {
            guildId: props.guildId,
            discordId: channel.id,
          },
        },
        create: {
          ...data,
        },
        update: {
          ...data,
        },
      });

      // Fetch messages
      let fetchedMessages: Collection<string, Message<true>>;
      try {
        fetchedMessages = await channel.messages.fetch({
          limit: 100,
        });
      } catch (error) {
        if (isDiscordError(error)) {
          if (error.code === 50001) {
            // Bot doesn't have permission to access this channel
            continue;
          } else {
            throw error;
          }
        } else {
          throw error;
        }
      }

      // Save messages to database
      for (const fetchedMessage of fetchedMessages.values()) {
        if (
          fetchedMessage.content &&
          !fetchedMessage.author.bot &&
          fetchedMessage.content !== ''
        ) {
          await prisma.message.upsert({
            where: {
              channelId_discordId: {
                channelId: channelData.id,
                discordId: fetchedMessage.id,
              },
            },
            create: {
              discordId: fetchedMessage.id,
              content: fetchedMessage.content,
              authorDiscordId: fetchedMessage.author.id,
              channelId: channelData.id,
              createdAt: fetchedMessage.createdAt,
            },
            update: {},
          });
        }
      }

      // Calculate number of messages per day
      const messagesPerDay = await GuildRepository.calculateNumOfMessagesPerDay(
        channelData.id,
        fetchedMessages
      );

      if (messagesPerDay > 0) {
        // Generate channel image
        await this.generateImageOfChannel(channelData.id);

        // Create summary
        await this.generateSummaryOfChannel(channelData.id, fetchedMessages);
      }
    }

    // Calculate activity level of channel from 0 to 5
    await this.calculateActivityLevel(props.guildId);
  }

  static async generateImageOfChannel(channelId: number) {
    const channelData = await prisma.channel.findUnique({
      where: {
        id: channelId,
      },
    });
    if (!channelData) {
      throw new Error('Channel not found');
    }
    if (channelData.image) return;

    let imageUrl: string;
    try {
      const res = await axios(
        `https://api.unsplash.com/search/photos?query=${channelData.name}&page=1&per_page=1`,
        {
          method: 'GET',
          headers: {
            'Accept-Version': 'v1',
            Authorization: `Client-ID ${process.env.UNSPLASH_API_ACCESS_KEY}`,
          },
        }
      );
      imageUrl = res.data.results[0]?.urls.small;
    } catch (error) {
      console.log(error);
      imageUrl = 'https://source.unsplash.com/random/800x600';
    }
    await saveFileFromUrl({
      url: imageUrl,
      dir: 'channelImages',
      fileName: `${channelData.guildId}-${channelData.id}`,
    });
  }

  static async calculateNumOfMessagesPerDay(
    channelId: number,
    fetchedMessages: Collection<string, Message<true>>
  ) {
    const now = new Date();
    let messagesPerDay = 0;
    const oneWeekAgo = addToDate(now, { date: -7 });
    const firstMessageCreatedAt =
      fetchedMessages.last()?.createdAt ?? new Date();
    const lastMessageCreatedAt =
      fetchedMessages.first()?.createdAt ?? new Date();
    const daysElapsedSinceFirstMessageCreated =
      (now.getTime() - firstMessageCreatedAt.getTime()) / (1000 * 60 * 60 * 24);

    if (fetchedMessages.size === 0 || lastMessageCreatedAt < oneWeekAgo) {
      // No messages in the last week, set score to 0
      messagesPerDay = 0;
    } else {
      // Calculate score
      let cnt = 0;
      for (const fetchedMessage of fetchedMessages.values()) {
        if (
          fetchedMessage.content &&
          fetchedMessage.content !== '' &&
          !fetchedMessage.author.bot
        ) {
          cnt++;
        }
      }
      messagesPerDay = cnt / daysElapsedSinceFirstMessageCreated;
    }

    await prisma.channel.update({
      where: {
        id: channelId,
      },
      data: {
        messagesPerDay,
      },
    });

    return messagesPerDay;
  }

  static async generateSummaryOfChannel(
    channelId: number,
    fetchedMessages: Collection<string, Message<true>>
  ) {
    const openAiApi = new OpenAIApi(
      new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      })
    );
    const messagesForSummary = fetchedMessages
      .filter((fetchedMessage) => {
        if (
          fetchedMessage.content &&
          !fetchedMessage.author.bot &&
          fetchedMessage.content !== ''
        ) {
          return true;
        }
      })
      .map((fetchedMessage) => fetchedMessage.content)
      .slice(0, 12)
      .reverse();
    if (messagesForSummary.length === 0) return;

    //// Summary by OpenAI
    const languageName = await detectLanguage(messagesForSummary.join('\n'));
    const prompt = `-Summarize following chat in bullet points.
-Summarize only in ${languageName}.
-Summarize in 20 words at most and if the word count is going to be high, old conversations can be ignored.

Chat:
${JSON.stringify(messagesForSummary)}

Summary:
`;
    const openAiResponse = await openAiApi.createCompletion({
      model: 'text-davinci-003',
      prompt,
      temperature: 0.2,
      max_tokens: 516,
    });
    const summary = openAiResponse.data.choices[0].text;
    if (!summary) return;

    // Save summary to database
    await prisma.channelSummary.create({
      data: {
        channelId,
        content: summary,
      },
    });
  }

  static async calculateActivityLevel(guildId: number) {
    const channels = await prisma.channel.findMany({
      where: {
        guildId: guildId,
      },
    });
    const messagesPerDays = channels
      // Filter out channels that don't have messagesPerDay
      .filter((channel) => {
        if (channel.messagesPerDay !== null) {
          return true;
        }
      })
      .map((channel) => channel.messagesPerDay!);
    const maxMessagesPerDay = Math.max(...messagesPerDays);
    const minMessagesPerDay = Math.min(...messagesPerDays);
    let activityScore = 0;
    for (const channel of channels) {
      if (channels.length <= 5) {
        // If number of channels is a little, evaluate activityScore on an absolute scale
        const messagesPerDay = channels[0].messagesPerDay!;
        if (messagesPerDay === 0) {
          activityScore = 0;
        } else if (messagesPerDay < 0.1) {
          activityScore = 1;
        } else if (messagesPerDay < 1) {
          activityScore = 2;
        } else if (messagesPerDay < 3) {
          activityScore = 3;
        } else if (messagesPerDay < 10) {
          activityScore = 4;
        } else if (messagesPerDay >= 10) {
          activityScore = 5;
        }
      } else {
        activityScore =
          maxMessagesPerDay === 0 && minMessagesPerDay === 0
            ? 0
            : Math.round(
                (channel.messagesPerDay! - minMessagesPerDay) /
                  (maxMessagesPerDay - minMessagesPerDay)
              ) * 5;
      }
      await prisma.channel.update({
        where: {
          id: channel.id,
        },
        data: {
          activityScore,
        },
      });
    }
  }
}
