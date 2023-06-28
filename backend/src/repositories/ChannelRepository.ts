import { ChannelItem, ChannelSummaryItem } from '#/common/types/Channel';
import { prisma } from '@/lib/prisma';
import { addToDate } from '@/utils/dateHelper';
import {
  copyRandomImage,
  getImageUrl,
  saveFileFromUrl,
} from '@/utils/fileHelper';
import { detectLanguage } from '@/utils/languageHelper';
import { isDiscordError } from '@/utils/typeNarrower';
import {
  Channel,
  ChannelCategory,
  Message as MessageModel,
} from '@prisma/client';
import axios, { isAxiosError } from 'axios';
import {
  Collection,
  Message,
  NonThreadGuildBasedChannel,
  TextChannel,
} from 'discord.js';
import { Configuration, OpenAIApi } from 'openai';
import { v4 as uuid } from 'uuid';

export class ChannelRepository {
  static async format(channel: Channel) {
    // Fetch category
    const categoryData = channel.categoryId
      ? await prisma.channelCategory.findUnique({
          where: {
            id: channel.categoryId,
          },
        })
      : null;

    // Fetch channel summaries
    const channelSummaries = await prisma.channelSummary.findMany({
      where: {
        channelId: channel.id,
      },
    });

    const channelItem: ChannelItem = {
      id: channel.id,
      discordId: channel.discordId,
      name: channel.name,
      topic: channel.topic,
      guildId: channel.guildId,
      categoryId: channel.categoryId,
      imageURL: channel.image && getImageUrl('channelImages', channel.image),
      activityScore: channel.activityScore,
      messagesPerDay: channel.messagesPerDay,
      category: categoryData
        ? {
            id: categoryData.id,
            discordId: categoryData.discordId,
            name: categoryData.name,
            guildId: categoryData.guildId,
          }
        : null,
      summaries: channelSummaries.map((summary) => {
        const channelSummaryItem: ChannelSummaryItem = {
          id: summary.id,
          channelId: summary.channelId,
          content: summary.content,
        };
        return channelSummaryItem;
      }),
    };

    return channelItem;
  }

  static async getById(id: number) {
    const channel = await prisma.channel.findUnique({
      where: {
        id: id,
      },
    });
    if (!channel) throw new Error('Channel not found');
    return await this.format(channel);
  }

  static async getByGuildId(guildId: number) {
    const channels = await prisma.channel.findMany({
      where: {
        guildId: guildId,
      },
    });
    if (!channels) throw new Error('Channel not found');

    const formattedChannels = await Promise.all(
      channels.map(async (channel) => {
        return await this.format(channel);
      })
    );
    return formattedChannels;
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

    const lotId = uuid();
    for (const channel of availableChannels) {
      // Save category data to database
      let categoryData: ChannelCategory | null = null;
      if (channel.parent) {
        categoryData = await prisma.channelCategory.upsert({
          where: {
            guildId_discordId: {
              guildId: props.guildId,
              discordId: channel.parent.id,
            },
          },
          create: {
            discordId: channel.parent.id,
            name: channel.parent.name,
            guildId: props.guildId,
          },
          update: {
            name: channel.parent.name,
          },
        });
      }

      // Save channel data to database
      const creatingChannelData = {
        discordId: channel.id,
        name: channel.name,
        topic: channel.topic,
        guildId: props.guildId,
        categoryId: categoryData?.id,
      };
      const channelData = await prisma.channel.upsert({
        where: {
          guildId_discordId: {
            guildId: props.guildId,
            discordId: channel.id,
          },
        },
        create: creatingChannelData,
        update: creatingChannelData,
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
      let messagesData: MessageModel;
      for (const fetchedMessage of fetchedMessages.values()) {
        if (
          fetchedMessage.content &&
          !fetchedMessage.author.bot &&
          fetchedMessage.content !== ''
        ) {
          const data = {
            discordId: fetchedMessage.id,
            content: fetchedMessage.content,
            authorDiscordId: fetchedMessage.author.id,
            channelId: channelData.id,
            lotId: lotId,
            createdAt: fetchedMessage.createdAt,
          };
          messagesData = await prisma.message.upsert({
            where: {
              channelId_discordId: {
                channelId: channelData.id,
                discordId: fetchedMessage.id,
              },
            },
            create: data,
            update: data,
          });
        }
      }

      // Calculate number of messages per day
      const messagesPerDay = await this.calculateNumOfMessagesPerDay(
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

    let imageName: string | null = null;
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
      const imageUrl = res.data.results[0]?.urls.small;
      const { fileName: savedImageName } = await saveFileFromUrl({
        url: imageUrl,
        dir: 'channelImages',
        fileName: `${channelData.guildId}-${channelData.id}`, // TODO: UUID
      });
      imageName = savedImageName;
    } catch (error) {
      if (isAxiosError(error)) {
        imageName = `${channelData.guildId}-${channelData.id}.jpg`;
        await copyRandomImage(
          'channelImages',
          `${channelData.guildId}-${channelData.id}.jpg`
        );
      }
    }
    await prisma.channel.update({
      where: {
        id: channelId,
      },
      data: {
        image: imageName,
      },
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
    const prompt = `-Summarize following chat in bullet points with "-" as the initial letter.
-Summarize only in ${languageName}.
-Summarize in 20 words at most and if the word count is going to be high, old conversations can be ignored.

Chat:
${JSON.stringify(messagesForSummary)}

Summary:
`;
    const openAiResponse = await openAiApi.createCompletion({
      model: 'text-davinci-003',
      prompt,
      temperature: 0.8,
      max_tokens: 516,
    });
    const summary = openAiResponse.data.choices[0].text;

    // Save summary to database
    if (summary) {
      // Separate by bullet points ('-' or '\n')
      const summaries = summary
        .split('\n')
        .filter((summary) => summary.trim()) // Remove empty lines
        .map((summary) => summary.trim().substring(1));

      await prisma.channelSummary.deleteMany({
        where: {
          channelId,
        },
      });
      for (const summaryContent of summaries) {
        await prisma.channelSummary.create({
          data: {
            channelId,
            content: summaryContent,
          },
        });
      }
    }
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
        const messagesPerDay = channel.messagesPerDay!;
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
