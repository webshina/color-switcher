import { Client } from 'discord.js';

// This is a hack to make the bot a singleton
const globalForDiscord = global as unknown as { bot: Client };

export const getBot = async () => {
  if (globalForDiscord.bot) {
    // If the bot is already logged in, return it
    return globalForDiscord.bot;
  } else {
    // If the bot isn't logged in, log it in and return it
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

    globalForDiscord.bot = bot;

    return bot;
  }
};
