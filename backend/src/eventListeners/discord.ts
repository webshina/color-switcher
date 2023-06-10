import Discord from 'discord.js';

export const startDiscordBot = () => {
  const client = new Discord.Client({
    intents: [
      'Guilds',
      'GuildMessages',
      'GuildMessageReactions',
      'MessageContent',
    ],
  });

  client.login(process.env.DISCORD_BOT_TOKEN);
};
