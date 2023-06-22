import { messages } from '#/common/constants/messages';
import { GuildItem } from '#/common/types/Guild';
import { prisma } from '@/lib/prisma';
import {
  copyRandomImage,
  getImageUrl,
  saveFileFromUrl,
} from '@/utils/fileHelper';
import { detectLanguage } from '@/utils/languageHelper';
import { Guild as GuildData } from '@prisma/client';
import axios, { isAxiosError } from 'axios';
import { Client, Guild } from 'discord.js';
import { Configuration, OpenAIApi } from 'openai';
import { ChannelRepository } from './ChannelRepository';

export class GuildRepository {
  static async format(guildData: GuildData) {
    const channelItems = await ChannelRepository.getByGuildId(guildData.id);

    // Fetch tags
    const guildTags = await prisma.guildTag.findMany({
      where: {
        guildId: guildData.id,
      },
    });

    const guildItem: GuildItem = {
      id: guildData.id,
      discordId: guildData.discordId,
      name: guildData.name,
      description: guildData.description,
      coverImageUrl:
        guildData.coverImage &&
        getImageUrl('guildImages', guildData.coverImage),
      isPrivate: guildData.isPrivate,
      inProgress: guildData.inProgress,
      iconURL: guildData.iconURL,
      createdByUserId: guildData.createdByUserId,
      availableChannelCnt: guildData.availableChannelCnt ?? 0,
      createdChannelCnt: channelItems.length,
      lastSyncedAt: guildData.lastSyncedAt,
      channels: channelItems,
      tags: guildTags.map((guildTag) => ({
        id: guildTag.id,
        name: guildTag.name,
        guildId: guildTag.guildId,
      })),
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
    if (guildDataList.length === 0) {
      return [];
    }

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
    // Generate channels data
    const fetchedChannels = await props.fetchedGuild.channels.fetch();
    await ChannelRepository.generateChannelsData({
      guildId: props.guildData.id,
      channels: fetchedChannels.values(),
    });

    this.generateDescription(props.guildData.id);

    this.generateTags(props.guildData.id).then(() => {
      this.generateGuildImage(props.guildData.id);
    });

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

  static async generateDescription(guildId: number) {
    const openAiApi = new OpenAIApi(
      new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      })
    );

    const channels = await prisma.channel.findMany({
      where: {
        guildId,
      },
      include: {
        channelSummaries: true,
      },
    });
    const materialsForDescription = JSON.stringify(
      channels.map((channel) => {
        return {
          name: channel.name,
          summaries: channel.channelSummaries.map((summary) => {
            return summary.content;
          }),
        };
      })
    );
    const languageName = await detectLanguage(materialsForDescription);
    const prompt = `-Create description of Discord server using following channel data. 
-Describe in bullet points.
-Describe only in ${languageName}.
-Describe in 300 characters or less.
-Format it for easy viewing.
-Include purpose of the server.

Channel data:
${materialsForDescription}

Description:

`;

    const openAiResponse = await openAiApi.createCompletion({
      model: 'text-davinci-003',
      prompt,
      temperature: 0.8,
      max_tokens: 1024,
    });
    const summary = openAiResponse.data.choices[0].text;
    if (summary) {
      await prisma.guild.update({
        where: {
          id: guildId,
        },
        data: {
          description: summary,
        },
      });
    }
  }

  static async generateTags(guildId: number) {
    const openAiApi = new OpenAIApi(
      new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      })
    );

    const channels = await prisma.channel.findMany({
      where: {
        guildId,
      },
      include: {
        channelSummaries: true,
      },
    });
    const materialsForTags = JSON.stringify(
      channels.map((channel) => {
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
-Comma-separated output.
-Only in ${languageName}.
-List at most 5.
-In order of relevance.

Channel data:
${materialsForTags}

Keywords:
    
`;

    const openAiResponse = await openAiApi.createCompletion({
      model: 'text-davinci-003',
      prompt,
      temperature: 0.8,
      max_tokens: 1024,
    });
    const tags = openAiResponse.data.choices[0].text;
    if (tags) {
      await prisma.guildTag.deleteMany({
        where: {
          guildId,
        },
      });
      const tagsArray = tags.split(',').map((tag) => tag.trim());
      await Promise.all(
        tagsArray.map(async (tag) => {
          await prisma.guildTag.create({
            data: {
              guildId,
              name: tag,
            },
          });
        })
      );
    }
  }

  static async generateGuildImage(guildId: number) {
    const guild = await prisma.guild.findUnique({
      where: {
        id: guildId,
      },
      include: {
        tags: true,
      },
    });
    if (!guild) {
      throw new Error('Guild not found');
    }
    if (guild.coverImage) {
      return;
    }

    let imageName: string | null = null;
    for (const tag of guild?.tags) {
      try {
        const res = await axios(
          `https://api.unsplash.com/search/photos?query=${tag.name}&page=1&per_page=1`,
          {
            method: 'GET',
            headers: {
              'Accept-Version': 'v1',
              Authorization: `Client-ID ${process.env.UNSPLASH_API_ACCESS_KEY}`,
            },
          }
        );
        const imageUrl = res.data.results[0]?.urls.regular;
        if (imageUrl) {
          const { fileName: savedImageName } = await saveFileFromUrl({
            url: imageUrl,
            dir: 'guildImages',
            fileName: `${guild.id}`,
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
      imageName = `${guild.id}`;
      await copyRandomImage('guildImages', `${guild.id}.jpg`);
    }

    await prisma.guild.update({
      where: {
        id: guildId,
      },
      data: {
        coverImage: imageName,
      },
    });
  }
}
