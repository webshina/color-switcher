import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/winston';
import { GuildRepository } from '@/repositories/GuildRepository';
import { exit } from 'process';

const execute = async () => {
  const guilds = await prisma.guild.findMany();

  for (const guild of guilds) {
    logger.info(`Generating guild id: ${guild.id}`);

    await GuildRepository.generate(guild.discordId, guild.createdByUserId!);

    // Wait 1 minutes
    await new Promise((resolve) => setTimeout(resolve, 60000));
  }

  logger.info('Finished generating guilds');

  exit(0);
};

execute();
