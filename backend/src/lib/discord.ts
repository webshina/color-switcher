import { Client } from 'discord.js';

// This is a hack to make the bot a singleton
const globalForDiscord = global as unknown as { bot: Client | null };

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
        'GuildMembers',
      ],
    });
    await bot.login(process.env.DISCORD_BOT_TOKEN);

    globalForDiscord.bot = bot;

    return bot;
  }
};

export const destroyBot = () => {
  if (globalForDiscord.bot) {
    globalForDiscord.bot.destroy();
    globalForDiscord.bot = null;
  }
};
