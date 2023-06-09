import { GuildRepository } from '@/repositories/GuildRepository';
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

  client.on('guildCreate', async (guild) => {
    await GuildRepository.provision({
      discordId: guild.id,
      name: guild.name,
      status: 'provisional',
      iconURL: guild.iconURL() ?? '',
    });
  });

  client.login(process.env.DISCORD_BOT_TOKEN);
};
