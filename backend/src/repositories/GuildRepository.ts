import { prisma } from '@/lib/prisma';
import { addToDate } from '@/utils/dateHelper';
import { saveFileFromUrl } from '@/utils/fileHelper';
import { isDiscordError } from '@/utils/typeNarrower';
import { GuildStatus } from '@prisma/client';
import axios from 'axios';
import { loadModule } from 'cld3-asm';
import {
  Client,
  Collection,
  Guild,
  Message,
  NonThreadGuildBasedChannel,
  TextChannel,
} from 'discord.js';
import ISO6391 from 'iso-639-1';
import { Configuration, OpenAIApi } from 'openai';

export class GuildRepository {
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
    const fetchedGuildAvailable = await cachedGuilds.get(discordId)?.fetch();
    if (!fetchedGuildAvailable) {
      throw new Error('Bot cannot find guild');
    }
    if (!fetchedGuildAvailable.available) {
      throw new Error('Guild is not available');
    }
    await GuildRepository.generateGuildData({
      guild: fetchedGuildAvailable,
      createdByUserId,
    });
  }

  static async generateGuildData(props: {
    guild: Guild;
    createdByUserId: number;
  }) {
    const guild = await prisma.guild.upsert({
      where: {
        discordId: props.guild.id,
      },
      create: {
        discordId: props.guild.id,
        name: props.guild.name,
        status: 'published' as GuildStatus,
        iconURL: props.guild.iconURL(),
        createdByUser: {
          connect: {
            id: props.createdByUserId,
          },
        },
        lastSyncedAt: new Date(),
      },
      update: {
        name: props.guild.name,
        iconURL: props.guild.iconURL(),
        lastSyncedAt: new Date(),
      },
    });

    const fetchedChannels = await props.guild.channels.fetch();
    this.generateChannelsData({
      guildId: guild.id,
      channels: fetchedChannels.values(),
    });

    return guild;
  }

  static async generateChannelsData(props: {
    guildId: number;
    channels: IterableIterator<NonThreadGuildBasedChannel | null>;
  }) {
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

      // Save channel data to database
      const data = {
        discordId: textChannel.id,
        name: textChannel.name,
        topic: textChannel.topic,
        guildId: props.guildId,
      };
      const channelData = await prisma.channel.upsert({
        where: {
          guildId_discordId: {
            guildId: props.guildId,
            discordId: textChannel.id,
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
        fetchedMessages = await textChannel.messages.fetch({
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

      // Generate channel image
      if (messagesPerDay > 0) {
        await GuildRepository.generateImageOfChannel(channelData.id);
      }

      // Create summary
      if (messagesPerDay > 0) {
        await GuildRepository.generateSummaryOfChannel(
          channelData.id,
          fetchedMessages
        );
      }
    }

    // Calculate activity level of channel from 0 to 5
    await GuildRepository.calculateActivityLevel(props.guildId);
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
    if (!channelData.image) {
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
      const imageUrl = res.data.results[0]?.urls.small;
      await saveFileFromUrl({
        url: imageUrl,
        dir: 'channelImages',
        fileName: `${channelData.guildId}-${channelData.id}`,
      });
    }
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
    //// Detect language
    const cldFactory = await loadModule();
    const langId = cldFactory.create(0, 700);
    const languageCode = langId.findMostFrequentLanguages(
      JSON.stringify(messagesForSummary),
      3
    )[0].language;
    //// Convert language code to language name
    const languageName = ISO6391.getName(languageCode);
    //// Summary by OpenAI
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
