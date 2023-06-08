import Discord from 'discord.js';

export const startDiscordBot = async () => {
  const client = new Discord.Client({
    intents: [
      'Guilds',
      'GuildMessages',
      'GuildMessageReactions',
      'MessageContent',
    ],
  });

  client.on('guildCreate', async (guild) => {
    console.log(`Joined a new guild: ${guild.name}`);
  });

  client.login(process.env.DISCORD_BOT_TOKEN);
};
