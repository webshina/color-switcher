import { getBot } from '@/lib/discord';
import { isDiscordError } from '@/utils/typeNarrower';
import { TextChannel } from 'discord.js';

const execute = async () => {
  const bot = await getBot();

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
};

execute();
