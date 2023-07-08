import { Client } from 'discord.js';

export const getBot = async () => {
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

  return bot;
};
