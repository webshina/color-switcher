-- AlterTable
ALTER TABLE `GuildBatch` MODIFY `isChannelGenerateCompleted` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `totalChannelCnt` INTEGER NULL,
    MODIFY `completedChannelCnt` INTEGER NULL,
    MODIFY `isChannelGenerationCompleted` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `isGuildDescriptionGenerationCompleted` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `isGuildTagGenerationCompleted` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `isGuildMemberGenerationCompleted` BOOLEAN NOT NULL DEFAULT false;
