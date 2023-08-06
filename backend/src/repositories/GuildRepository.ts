import { messages } from '#/common/constants/messages';
import { AutoGenerateTarget } from '#/common/types/AutoGenerateTarget';
import { ChannelCategoryItem, ChannelItem } from '#/common/types/Channel';
import {
  GuildAnnouncementItem,
  GuildItem,
  GuildPostItem,
} from '#/common/types/Guild';
import { GetBatchProgressResponse } from '#/common/types/apiResponses/GuildControllerResponse';
import { getBot } from '@/lib/discord';
import { createCompletion } from '@/lib/openAI';
import { prisma } from '@/lib/prisma';
import { fetchImageFromUnsplash } from '@/lib/unsplash';
import {
  copyRandomImage,
  deleteFile,
  getFileInfoFromFormidable,
  getImageUrl,
  saveFileFromUrl,
  uploadFile,
} from '@/utils/fileHelper';
import { detectLanguage } from '@/utils/languageHelper';
import { Language, PostName } from '@prisma/client';
import { isAxiosError } from 'axios';
import {
  ChannelType,
  Collection,
  NonThreadGuildBasedChannel,
  TextChannel,
} from 'discord.js';
import formidable from 'formidable';
import { v4 as uuid } from 'uuid';
import { ChannelRepository } from './ChannelRepository';
import { GuildMemberRepository } from './GuildMemberRepository';

export class GuildRepository {
  static async format(
    guildId: number,
    option?: { byManager?: boolean; membersCnt?: number }
  ) {
    const guildData = await prisma.guild.findUnique({
      where: {
        id: guildId,
      },
      include: {
        channelCategories: {
          include: {
            channels: {
              include: {
                channelSummaries: true,
              },
            },
          },
          orderBy: {
            order: 'asc',
          },
        },
        channels: {
          include: {
            channelSummaries: true,
          },
        },
        posts: true,
        notificationsToGuildManager: {
          where: {
            isShow: true,
          },
        },
      },
    });
    if (!guildData) {
      throw new Error('Guild not found');
    }

    const channelCategoryItems: ChannelCategoryItem[] = [];
    for (const channelCategory of guildData.channelCategories) {
      const channelItems: ChannelItem[] =
        await ChannelRepository.getByGuildIdCategoryId(
          guildData.id,
          channelCategory.id
        );
      const channelCategoryItem: ChannelCategoryItem = {
        id: channelCategory.id,
        discordId: channelCategory.discordId,
        guildId: channelCategory.guildId,
        name: channelCategory.name,
        channels: channelItems,
        order: channelCategory.order,
      };
      channelCategoryItems.push(channelCategoryItem);
    }

    // Fetch tags
    const guildTags = await prisma.guildTag.findMany({
      where: {
        guildId: guildData.id,
      },
    });

    // Fetch members
    const guildMembers = await GuildMemberRepository.getByGuildId(
      guildData.id,
      {
        membersCnt: option?.membersCnt,
      }
    );
    const membersCnt = await prisma.guildMember.count({
      where: {
        guildId: guildData.id,
      },
    });

    // Fetch management members
    const managementMembers = await GuildMemberRepository.getManagersByGuildId(
      guildData.id
    );

    const posts: GuildPostItem[] = guildData.posts.map((post) => ({
      id: post.id,
      guildId: post.guildId,
      name: post.name,
    }));

    // Fetch Batch Data
    const batchData = await prisma.guildBatch.findFirst({
      where: {
        guildId: guildData.id,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    // Fetch Announcements
    const announcements = await this.getAnnouncementMessages(
      guildData.id,
      option?.byManager ?? false
    );

    const guildItem: GuildItem = {
      id: guildData.id,
      discordId: guildData.discordId,
      name: guildData.name,
      description: guildData.description,
      shareMessage: guildData.shareMessage,
      autoGenerateShareMessage: guildData.autoGenerateShareMessage,
      autoGenerateDescription: guildData.autoGenerateDescription,
      autoGenerateTags: guildData.autoGenerateTags,
      coverImageUrl:
        guildData.coverImage &&
        getImageUrl('guildCoverImages', guildData.coverImage),
      isPrivate: guildData.isPrivate,
      iconURL: guildData.iconURL,
      inviteURL: guildData.inviteURL,
      createdByUserId: guildData.createdByUserId,
      language: guildData.language,
      availableChannelCnt: guildData.availableChannelCnt ?? 0,
      createdChannelCnt: guildData.channels.length,
      lastSyncedAt: batchData?.updatedAt,
      categories: channelCategoryItems,
      tags: guildTags.map((guildTag) => ({
        id: guildTag.id,
        name: guildTag.name,
        guildId: guildTag.guildId,
      })),
      members: guildMembers,
      membersCnt,
      managementMembers: managementMembers,
      posts,
      notificationsToGuildManager: guildData.notificationsToGuildManager,
      announcements,
    };
    return guildItem;
  }

  static async getById(
    guildId: number,
    option?: {
      byManager?: boolean;
      membersCnt?: number;
    }
  ) {
    const guildData = await prisma.guild.findUnique({
      where: {
        id: guildId,
      },
    });
    if (!guildData) throw new Error('Guild not found');

    return await this.format(guildData.id, option);
  }

  static async getByDiscordId(guildDiscordId: string) {
    const guildData = await prisma.guild.findUnique({
      where: {
        discordId: guildDiscordId,
      },
    });
    if (!guildData) throw new Error('Guild not found');

    return await this.format(guildData.id);
  }

  static async getByUserId(userId: number) {
    const guildDataList = await prisma.guild.findMany({
      where: {
        createdByUserId: userId,
      },
    });
    if (guildDataList.length === 0) {
      return [];
    }

    const guildItems = await Promise.all(
      guildDataList.map(async (guildData) => {
        return await this.format(guildData.id);
      })
    );
    return guildItems;
  }

  static async getAnnouncementMessages(
    guildId: number,
    byOwner = false,
    limit = 3
  ) {
    const channel = await prisma.channel.findFirst({
      where: {
        guildId,
        isAnnouncementChannel: true,
      },
      include: {
        messages: {
          // hide specified messages if not admin
          where: byOwner
            ? undefined
            : {
                hideAsAnnouncement: {
                  not: false,
                },
              },
          take: limit,
          orderBy: {
            postedAt: 'desc',
          },
        },
      },
    });
    if (!channel) return [];

    const formattedMessages: GuildAnnouncementItem[] = [];
    for (const message of channel.messages) {
      const author = await prisma.guildMember.findUnique({
        where: {
          guildId_discordId: {
            guildId,
            discordId: message.authorDiscordId,
          },
        },
      });
      if (!author) continue;
      const formattedMessage: GuildAnnouncementItem = {
        message: {
          id: message.id,
          content: message.content,
        },
        author: {
          id: author.id,
          discordId: author.discordId,
          displayName: author.displayName ?? '',
          avatarURL: author.avatarURL ?? '',
        },
        hideAsAnnouncement: message.hideAsAnnouncement ?? false,
        postedAt: message.postedAt,
      };
      formattedMessages.push(formattedMessage);
    }

    return formattedMessages;
  }

  static async generate(discordId: string, createdByUserId: number) {
    const bot = await getBot();

    // Fetch Guild Info
    const cachedGuilds = bot.guilds.cache;
    const fetchedGuild = await cachedGuilds.get(discordId)?.fetch();
    if (!fetchedGuild) {
      throw new Error(messages.botNotInstalled);
    } else if (!fetchedGuild.available) {
      throw new Error('Guild is not available');
    }

    // Save guild data to DB
    const guildData = await prisma.guild.upsert({
      where: {
        discordId: fetchedGuild.id,
      },
      create: {
        discordId: fetchedGuild.id,
        name: fetchedGuild.name,
        isPrivate: false,
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

    const guildBatch = await prisma.guildBatch.create({
      data: {
        guildId: guildData.id,
        isStarted: true,
      },
    });

    // Create guild posts
    const guildPostData: {
      guildId: number;
      name: PostName;
    } = {
      guildId: guildData.id,
      name: 'MANAGER',
    };
    await prisma.guildPost.upsert({
      where: {
        guildId_name: guildPostData,
      },
      update: guildPostData,
      create: guildPostData,
    });

    // Create notifications
    await this.createNotificationToGuildManager(guildData.id);

    // Generate channels data
    const fetchedChannels = await fetchedGuild.channels.fetch();
    ChannelRepository.generateChannelsData({
      guildId: guildData.id,
      channels: fetchedChannels.values(),
      batchId: guildBatch.id,
    }).then(() => {
      // Generate Description data
      this.generateDescription({
        guildId: guildData.id,
        batchId: guildBatch.id,
      });

      // Generate Tags data
      this.generateTags({
        guildId: guildData.id,
        batchId: guildBatch.id,
      }).then(() => {
        // Generate InviteLink data
        this.generateInviteLink(guildData.id, fetchedChannels);

        // Generate ShareMessage data
        this.generateShareMessage({
          guildId: guildData.id,
          batchId: guildBatch.id,
        });

        // Generate GuildImage data
        this.generateCoverImage({
          guildId: guildData.id,
          batchId: guildBatch.id,
        });
      });

      // Generate Member data
      GuildMemberRepository.generate({
        fetchedGuild: fetchedGuild,
        guildId: guildData.id,
        batchId: guildBatch.id,
      });

      // Generate Announcement data
      this.findAnnouncementChannel({
        guildId: guildData.id,
        batchId: guildBatch.id,
      });
    });

    return {
      guildId: guildData.id,
      guildBatchId: guildBatch.id,
    };
  }

  static async createNotificationToGuildManager(guildId: number) {
    await prisma.notificationToGuildManager.upsert({
      where: {
        guildId_name: {
          guildId,
          name: 'INSTRUCTION_FOR_POST_TO_CHANNEL',
        },
      },
      update: {},
      create: {
        guildId,
        name: 'INSTRUCTION_FOR_POST_TO_CHANNEL',
        isShow: true,
      },
    });

    await prisma.notificationToGuildManager.upsert({
      where: {
        guildId_name: {
          guildId,
          name: 'INSTRUCTION_FOR_POST_TO_SOCIAL_MEDIA',
        },
      },
      update: {},
      create: {
        guildId,
        name: 'INSTRUCTION_FOR_POST_TO_SOCIAL_MEDIA',
        isShow: true,
      },
    });
  }

  static async generateInviteLink(
    guildId: number,
    fetchedChannels: Collection<string, NonThreadGuildBasedChannel | null>
  ) {
    for (const fetchedChannel of fetchedChannels.values()) {
      if (fetchedChannel?.type === ChannelType.GuildText) {
        try {
          const channel = (await fetchedChannel.fetch()) as TextChannel;
          const inviteData = await channel?.createInvite({
            maxAge: 0,
            maxUses: 0,
            unique: true,
          });
          await prisma.guild.update({
            where: {
              id: guildId,
            },
            data: {
              inviteURL: inviteData.url,
            },
          });
        } catch (error) {
          continue;
        }
      }
    }
  }

  static async generateDescription(props: {
    guildId: number;
    batchId: number;
  }) {
    const guildData = await prisma.guild.findUnique({
      where: {
        id: props.guildId,
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

    if (guildData.autoGenerateDescription) {
      const materialsForDescription = JSON.stringify(
        guildData.channels.map((channel) => {
          return {
            name: channel.name,
            summaries: channel.channelSummaries.map((summary) => {
              return summary.content;
            }),
          };
        })
      );

      // Detect language
      const languageName = (await detectLanguage(
        materialsForDescription
      )) as Language;
      await prisma.guild.update({
        where: {
          id: props.guildId,
        },
        data: {
          language: languageName,
        },
      });

      const prompt = `Create description of Discord server using following channel data. 
-Describe only in ${languageName}.
-Be sure to write within 300 characters or less.
-Include purpose of the server and characteristics of participants.
-Never describe individual channels.
-Use some emojis for easy viewing.

Channel data:
${materialsForDescription}

Description:

`;

      const summary = await createCompletion({
        prompt,
        maxTokens: 1024,
      });
      if (summary) {
        await prisma.guild.update({
          where: {
            id: props.guildId,
          },
          data: {
            description: summary,
          },
        });
      }
    }

    // Update batch progress
    await prisma.guildBatch.update({
      where: {
        id: props.batchId,
      },
      data: {
        isGuildDescriptionGenerationCompleted: true,
      },
    });
  }

  static async generateShareMessage(props: {
    guildId: number;
    batchId: number;
  }) {
    const guildData = await prisma.guild.findUnique({
      where: {
        id: props.guildId,
      },
      include: {
        channels: {
          include: {
            channelSummaries: true,
          },
        },
        tags: true,
      },
    });
    if (!guildData) throw new Error('Guild not found');

    if (guildData.autoGenerateShareMessage) {
      const materialsForDescription = JSON.stringify(
        guildData.channels.map((channel) => {
          return channel.channelSummaries.map((summary) => {
            return summary.content;
          });
        })
      );
      const languageName = await detectLanguage(materialsForDescription);
      const url = `${process.env.FRONTEND_URL}/guild/${guildData.id}`;
      const hashtags = guildData.tags
        .map((tag) => {
          return `#${tag.name}`;
        })
        .join(' ');

      let shareMessage = '';
      if (languageName === 'Japanese') {
        shareMessage = `Discordコミュニティ「${guildData.name}」に参加しましょう！

<${guildData.name}>
${url}

${hashtags}
`;
      } else {
        shareMessage = `Join Discord Community "${guildData.name}" ！

<${guildData.name}>
${url}

${hashtags}
`;
      }

      await prisma.guild.update({
        where: {
          id: props.guildId,
        },
        data: {
          shareMessage,
        },
      });
    }

    // Update batch progress
    await prisma.guildBatch.update({
      where: {
        id: props.batchId,
      },
      data: {
        isGuildShareMessageGenerationCompleted: true,
      },
    });
  }

  static async generateTags(props: { guildId: number; batchId: number }) {
    const guildData = await prisma.guild.findUnique({
      where: {
        id: props.guildId,
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

    if (guildData.autoGenerateTags) {
      const materialsForTags = JSON.stringify(
        guildData.channels.map((channel) => {
          return {
            channelName: channel.name,
            channelSummaries: channel.channelSummaries.map((summary) => {
              return summary.content;
            }),
          };
        })
      );
      const languageName = await detectLanguage(materialsForTags);
      const prompt = `-Create keywords of this Discord server using following channel data.
-Separated by ",".
-Don't surround it with quotations, etc.
-Only in ${languageName}.
-List at most 5.
-In order of relevance.

Channel data:
${materialsForTags}

Keywords:
    
`;

      const tags = await createCompletion({
        prompt,
        maxTokens: 1024,
      });
      if (tags) {
        await prisma.guildTag.deleteMany({
          where: {
            guildId: props.guildId,
          },
        });
        const tagsArray = tags.split(',').map((tag) => tag.trim());
        await Promise.all(
          tagsArray.map(async (tag) => {
            await prisma.guildTag.create({
              data: {
                guildId: props.guildId,
                name: tag,
              },
            });
          })
        );
      }
    }

    // Update batch progress
    await prisma.guildBatch.update({
      where: {
        id: props.batchId,
      },
      data: {
        isGuildTagGenerationCompleted: true,
      },
    });
  }

  static async generateCoverImage(props: { guildId: number; batchId: number }) {
    const existingGuildData = await prisma.guild.findUnique({
      where: {
        id: props.guildId,
      },
      include: {
        tags: true,
      },
    });
    if (!existingGuildData) {
      throw new Error('Guild not found');
    }

    if (!existingGuildData.coverImage) {
      let imageName: string | null = null;
      for (const tag of existingGuildData?.tags) {
        try {
          // Fetch a keyword from channel
          const prompt = `Extract a english word from '${tag}' .

- In lower case.
- Return only one word.

Word:
`;
          const englishTagName = await createCompletion({
            prompt,
            maxTokens: 4,
          });

          const imageUrl = await fetchImageFromUnsplash(
            englishTagName ?? tag.name,
            'regular'
          );
          if (imageUrl) {
            const { fileName: savedImageName } = await saveFileFromUrl({
              url: imageUrl,
              dir: 'guildCoverImages',
              fileName: uuid(),
            });
            imageName = savedImageName;
            break;
          }
        } catch (error) {
          if (isAxiosError(error)) {
            continue;
          }
        }
      }

      if (!imageName) {
        imageName = `${existingGuildData.id}`;
        await copyRandomImage('guildCoverImages', `${uuid()}.jpg`);
      }

      await prisma.guild.update({
        where: {
          id: props.guildId,
        },
        data: {
          coverImage: imageName,
        },
      });

      if (existingGuildData.coverImage) {
        deleteFile('guildCoverImages', existingGuildData.coverImage);
      }
    }

    // Update batch progress
    await prisma.guildBatch.update({
      where: {
        id: props.batchId,
      },
      data: {
        isGuildImageGenerationCompleted: true,
      },
    });
  }

  static async findAnnouncementChannel(props: {
    guildId: number;
    batchId: number;
  }) {
    // Update batch progress
    const updateBatchProgress = async () => {
      await prisma.guildBatch.update({
        where: {
          id: props.batchId,
        },
        data: {
          isGuildAnnouncementGenerationCompleted: true,
        },
      });
    };

    const guildData = await prisma.guild.findUnique({
      where: {
        id: props.guildId,
      },
      include: {
        channels: true,
      },
    });

    // Find announcement channel
    // // Include text related to 'announce' in channel name
    const announcementChannel = guildData?.channels.find((channel) => {
      const relatedTexts = [
        'announce',
        'news',
        'update',
        'アナウンス',
        'お知らせ',
        'ニュース',
      ];
      for (const text of relatedTexts) {
        if (channel.name.toLowerCase().includes(text)) {
          return true;
        }
      }
    });

    if (announcementChannel) {
      await prisma.channel.update({
        where: {
          id: announcementChannel.id,
        },
        data: {
          isAnnouncementChannel: true,
        },
      });
    }

    updateBatchProgress();
  }

  static async getBatchProgress(batchId: number) {
    const guildBatch = await prisma.guildBatch.findFirst({
      where: {
        id: batchId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    if (!guildBatch) {
      throw new Error('Guild batch not found');
    }

    let result: GetBatchProgressResponse = {
      progressRate: 0,
    };

    // Calculate progress rate
    let allWorkCnt =
      1 + // isStarted
      (guildBatch.totalChannelCnt ?? 0) +
      1 + // isChannelGenerationCompleted
      1 + // isGuildDescriptionGenerationCompleted
      1 + // isGuildShareMessageGenerationCompleted
      1 + // isGuildTagGenerationCompleted
      1 + // isGuildImageGenerationCompleted
      1 + // isGuildMemberGenerationCompleted
      1; // isGuildAnnouncementGenerationCompleted

    let completedWorkCnt =
      (guildBatch.isStarted ? 1 : 0) +
      (guildBatch.completedChannelCnt ?? 0) +
      (guildBatch.isChannelGenerationCompleted ? 1 : 0) +
      (guildBatch.isGuildDescriptionGenerationCompleted ? 1 : 0) +
      (guildBatch.isGuildShareMessageGenerationCompleted ? 1 : 0) +
      (guildBatch.isGuildTagGenerationCompleted ? 1 : 0) +
      (guildBatch.isGuildImageGenerationCompleted ? 1 : 0) +
      (guildBatch.isGuildMemberGenerationCompleted ? 1 : 0) +
      (guildBatch.isGuildAnnouncementGenerationCompleted ? 1 : 0);
    result.progressRate = Number((completedWorkCnt / allWorkCnt).toFixed(2));

    return result;
  }

  static async update(
    guildId: number,
    params: {
      coverImage?: formidable.File;
      description?: string;
      isPrivate?: boolean;
      autoGenerateDescription?: boolean;
    }
  ) {
    const oldGuildData = await prisma.guild.findUnique({
      where: {
        id: guildId,
      },
    });
    if (!oldGuildData) {
      throw new Error('Guild not found');
    }

    // Update cover image
    if (params.coverImage) {
      const newFileName = uuid();
      const { buffer, ext, mimetype } = await getFileInfoFromFormidable(
        params.coverImage
      );
      const { fileName } = await uploadFile({
        dir: 'guildCoverImages',
        file: buffer,
        fileName: newFileName,
        extension: ext,
        mimetype,
      });
      await prisma.guild.update({
        where: {
          id: guildId,
        },
        data: {
          coverImage: fileName,
        },
      });
      if (oldGuildData.coverImage) {
        deleteFile('guildCoverImages', oldGuildData.coverImage);
      }
    }

    // Update description
    if (params.description) {
      await prisma.guild.update({
        where: {
          id: guildId,
        },
        data: {
          description: params.description,
        },
      });
    }

    // Update isPrivate
    if (params.isPrivate !== undefined) {
      await prisma.guild.update({
        where: {
          id: guildId,
        },
        data: {
          isPrivate: params.isPrivate,
        },
      });
    }
  }

  static async toggleAutoGeneration(
    guildId: number,
    params: {
      target: AutoGenerateTarget;
      value: boolean;
    }
  ) {
    await prisma.guild.update({
      where: {
        id: guildId,
      },
      data: {
        autoGenerateDescription:
          params.target === 'description' ? params.value : undefined,
        autoGenerateShareMessage:
          params.target === 'shareMessage' ? params.value : undefined,
        autoGenerateTags: params.target === 'tags' ? params.value : undefined,
      },
    });
  }

  static async updateTag(
    guildId: number,
    params:
      | { method: 'create'; name: string }
      | {
          method: 'delete';
          tagId: number;
        }
  ) {
    if (params.method === 'create') {
      await prisma.guildTag.create({
        data: {
          guildId,
          name: params.name,
        },
      });
    } else if (params.method === 'delete') {
      await prisma.guildTag.delete({
        where: {
          id: params.tagId,
        },
      });
    }
  }

  static async updateCategory(
    guildId: number,
    params: {
      categoryOrders: {
        id: number;
        order: number;
      }[];
    }
  ) {
    await Promise.all(
      params.categoryOrders.map((categoryOrder) =>
        prisma.channelCategory.update({
          where: {
            id: categoryOrder.id,
          },
          data: {
            order: categoryOrder.order,
          },
        })
      )
    );
  }
}
