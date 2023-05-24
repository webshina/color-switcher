import { Client, TextChannel } from 'discord.js';

const bot = new Client({
  intents: ['Guilds', 'GuildMessages', 'GuildMessageReactions'],
});
const token =
  'MTExMDcyOTk5MzIyODY1MjU3NA.GTn-rw.tanX6dam1Gfr6Kar6j3IAJHtZdq5LenUJqO7Dc';

bot.on('ready', async () => {
  console.log(`Logged in as ${bot.user?.tag}!`);

  bot.guilds.cache.each(async (guild) => {
    console.log(`Guild name: ${guild.name}`);
    guild.channels.cache.each(async (channel) => {
      if (channel.isTextBased()) {
        console.log(`Channel name: ${channel.name}`);
        const messages = await (channel as TextChannel).messages.fetch({
          limit: 100,
        });
        messages.each((message) => {
          console.log(`[${message.author.tag}] ${message.content}`);
        });
      }
    });
  });
});

bot.login(token);
