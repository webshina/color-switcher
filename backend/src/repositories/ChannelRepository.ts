import { ChannelItem, ChannelSummaryItem } from '#/common/types/Channel';
import { createCompletion } from '@/lib/openAI';
import { prisma } from '@/lib/prisma';
import {
  copyRandomImage,
  deleteFile,
  getImageUrl,
  saveFileFromUrl,
} from '@/utils/fileHelper';
import { detectLanguage } from '@/utils/languageHelper';
import { isDiscordError } from '@/utils/typeNarrower';
import { Channel, ChannelCategory } from '@prisma/client';
import axios from 'axios';
import {
  Collection,
  Message,
  NonThreadGuildBasedChannel,
  TextChannel,
} from 'discord.js';
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
            name: categoryData.name,
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
      autoGenerate: channel.autoGenerate,
      order: channel.order,
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
      orderBy: {
        messagesPerDay: 'desc',
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

  static async getByGuildIdCategoryId(guildId: number, categoryId: number) {
    const channels = await prisma.channel.findMany({
      where: {
        guildId: guildId,
        categoryId: categoryId,
      },
      orderBy: {
        messagesPerDay: 'desc',
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
    batchId: number;
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

    // Update batch progress
    await prisma.guildBatch.update({
      where: {
        id: props.batchId,
      },
      data: {
        totalChannelCnt: availableChannels.length,
      },
    });

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
            batchId: props.batchId,
            createdAt: fetchedMessage.createdAt,
          };
          await prisma.message.upsert({
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

      // Update batch progress
      const batch = await prisma.guildBatch.findUnique({
        where: {
          id: props.batchId,
        },
      });
      await prisma.guildBatch.update({
        where: {
          id: props.batchId,
        },
        data: {
          completedChannelCnt: batch?.completedChannelCnt
            ? batch.completedChannelCnt + 1
            : 1,
        },
      });
    }

    // Calculate activity level of channel from 0 to 5
    await this.calculateActivityLevel(props.guildId);

    // Update batch progress
    await prisma.guildBatch.update({
      where: {
        id: props.batchId,
      },
      data: {
        isChannelGenerationCompleted: true,
      },
    });
  }

  static async generateImageOfChannel(channelId: number) {
    const existingChannelData = await prisma.channel.findUnique({
      where: {
        id: channelId,
      },
    });
    if (!existingChannelData) {
      throw new Error('Channel not found');
    }
    if (existingChannelData.image) return;

    let imageName: string | null = null;
    const res = await axios(
      `https://api.unsplash.com/search/photos?query=${existingChannelData.name}&page=1&per_page=1`,
      {
        method: 'GET',
        headers: {
          'Accept-Version': 'v1',
          Authorization: `Client-ID ${process.env.UNSPLASH_API_ACCESS_KEY}`,
        },
      }
    );

    // delete existing image
    const imageUrl = res.data.results[0]?.urls.small;
    if (imageUrl) {
      const { fileName: savedImageName } = await saveFileFromUrl({
        url: imageUrl,
        dir: 'channelImages',
        fileName: uuid(),
      });
      imageName = savedImageName;
    } else {
      imageName = `${uuid()}.jpg`;
      await copyRandomImage('channelImages', imageName);
    }

    await prisma.channel.update({
      where: {
        id: channelId,
      },
      data: {
        image: imageName,
      },
    });

    if (existingChannelData.image) {
      deleteFile('guildCoverImages', existingChannelData.image);
    }
  }

  static async calculateNumOfMessagesPerDay(
    channelId: number,
    fetchedMessages: Collection<string, Message<true>>
  ) {
    const now = new Date();
    let messagesPerDay = 0;
    const firstMessageCreatedAt =
      fetchedMessages.last()?.createdAt ?? new Date();
    const timesElapsedSinceFirstMessageCreated =
      now.getTime() - firstMessageCreatedAt.getTime();
    const daysElapsedSinceFirstMessageCreated = Math.max(
      timesElapsedSinceFirstMessageCreated / (1000 * 60 * 60 * 24),
      1
    );
    if (fetchedMessages.size === 0) {
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
    const summary = await createCompletion({
      prompt,
      maxTokens: 516,
    });

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
    let channelMessageScores = channels
      // Filter out channels that don't have messagesPerDay
      .filter((channel) => {
        if (channel.messagesPerDay !== null) {
          return true;
        }
      })
      .map((channel) => ({
        id: channel.id,
        // Logarithmically scale messagesPerDay
        score: Math.log10(channel.messagesPerDay!),
      }));
    const channelMessageScoresArray = channelMessageScores.map(
      (channelMessageScore) => channelMessageScore.score
    );
    const maxScore = Math.max(...channelMessageScoresArray);
    const minScore = Math.min(...channelMessageScoresArray);
    let activityScore = 0;
    for (const channelMessageScore of channelMessageScores) {
      if (channels.length <= 5) {
        // If number of channels is a little, evaluate activityScore on an absolute scale
        const channel = channels.find(
          (channel) => channel.id === channelMessageScore.id
        );
        const messagesPerDay = channel!.messagesPerDay!;
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
        // Standardize activityScore on a scale of 0 to 5
        activityScore =
          maxScore === 0 && minScore === 0
            ? 0
            : Math.round(
                ((channelMessageScore.score! - minScore) /
                  (maxScore - minScore)) *
                  5
              );
      }
      await prisma.channel.update({
        where: {
          id: channelMessageScore.id,
        },
        data: {
          activityScore,
        },
      });
    }
  }

  static async update(props: {
    guildId?: number;
    channelId?: number;
    params: {
      orders: {
        id: number;
        order: number;
      }[];
    };
  }) {
    if (props.params.orders && props.params.orders.length > 0) {
      await Promise.all(
        props.params.orders.map(async (order) => {
          await prisma.channel.update({
            where: {
              id: order.id,
            },
            data: {
              order: order.order,
            },
          });
        })
      );
    }
  }
}
