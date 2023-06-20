import { isDiscordError } from '@/utils/typeNarrower';
import { Client, TextChannel } from 'discord.js';

const bot = new Client({
  intents: [
    'Guilds',
    'GuildMessages',
    'GuildMessageReactions',
    'MessageContent',
  ],
});

bot.on('ready', async () => {
  const guilds = bot.guilds.cache;

  for (const guild of guilds.values()) {
    const channels = guild.channels.cache;

    for (const channel of channels.values()) {
      if (channel.isTextBased()) {
        try {
          const messages = await (channel as TextChannel).messages.fetch({
            limit: 100,
          });
          messages.each((message) => {
            console.log(message.content);
          });
        } catch (error) {
          if (isDiscordError(error)) {
            if (error.code === 50001) {
              console.log('Missing access');
            } else {
              console.error(error);
            }
          }
        }
      }
    }
  }
});

bot.login(process.env.DISCORD_TOKEN);
