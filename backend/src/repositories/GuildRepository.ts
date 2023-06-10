import { prisma } from '@/lib/prisma';
import { isDiscordError } from '@/utils/typeNarrower';
import { GuildStatus } from '@prisma/client';
import { loadModule } from 'cld3-asm';
import {
  Client,
  Guild,
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
    const guild = await GuildRepository.generateGuildData({
      guild: fetchedGuildAvailable,
      createdByUserId,
    });

    const fetchedChannels = fetchedGuildAvailable.channels.cache.values();
    // for (const fetchedChannel of fetchedChannels) {
    //   if (fetchedChannel.isTextBased()) {
    //   }
    // }

    // for (const channel of fetchedChannels) {
    //   if (channel.isTextBased()) {
    //     try {
    //       const messages = await (channel as TextChannel).messages.fetch({
    //         limit: 100,
    //       });
    //       messages.each((message) => {
    //         console.log(message.content);
    //       });
    //     } catch (error) {
    //       if (isDiscordError(error)) {
    //         if (error.code === 50001) {
    //           console.log('Missing access');
    //         } else {
    //           console.error(error);
    //         }
    //       }
    //     }
    //   }
    // }
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
      if (channel && channel.isTextBased()) {
        const textChannel = channel as TextChannel;

        // Save data to database
        const data = {
          discordId: textChannel.id,
          name: textChannel.name,
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

        // Create summary of channel
        try {
          // Fetch messages
          const fetchedMessages = await textChannel.messages.fetch({
            limit: 12,
          });
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
            .reverse();
          if (messagesForSummary.length === 0) continue;

          // Detect language
          const cldFactory = await loadModule();
          const langId = cldFactory.create(0, 700);
          const languageCode = langId.findMostFrequentLanguages(
            JSON.stringify(messagesForSummary),
            3
          )[0].language;
          // Convert language code to language name
          const languageName = ISO6391.getName(languageCode);

          // Create summary
          const openAiApi = new OpenAIApi(
            new Configuration({
              apiKey: process.env.OPENAI_API_KEY,
            })
          );
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
          if (!summary) continue;

          // Save summary to database
          const summaryData = await prisma.channelSummary.create({
            data: {
              channelId: channelData.id,
              content: summary,
            },
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
      }
    }
  }
}
