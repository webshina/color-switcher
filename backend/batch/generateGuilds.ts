import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/winston';
import { GuildRepository } from '@/repositories/GuildRepository';
import { exit } from 'process';

const execute = async () => {
  // Get args from command line
  const args = process.argv.slice(2);
  const guildDiscordId = args[0];

  const guilds = await prisma.guild.findMany({
    where: {
      discordId: guildDiscordId,
    },
  });

  for (const guild of guilds) {
    logger.info(`Generating guild id: ${guild.id}`);

    const startedAt = new Date();

    const { guildId, guildBatchId } = await GuildRepository.generate(
      guild.discordId,
      guild.createdByUserId!
    );

    let batchProgressRate = 0;

    // Wait for batch to finish
    while (batchProgressRate < 1) {
      batchProgressRate = (await GuildRepository.getBatchProgress(guildBatchId))
        .progressRate;

      // If the process takes over 10 min, exit
      if (new Date().getTime() - startedAt.getTime() > 1000 * 60 * 10) {
        logger.error('Batch process took over 10 min');
        exit(1);
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    logger.info(`Finished generating guild id: ${guild.id}`);
  }

  logger.info('Finished generating guilds');

  exit(0);
};

try {
  execute();
} catch (error) {
  console.log(error);
  logger.error(error);
  exit(1);
}
