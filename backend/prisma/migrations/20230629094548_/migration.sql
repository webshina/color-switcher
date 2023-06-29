/*
  Warnings:

  - You are about to drop the column `lotId` on the `Message` table. All the data in the column will be lost.
  - Added the required column `batchId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Message` DROP COLUMN `lotId`,
    ADD COLUMN `batchId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `GuildBatch` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `guildId` INTEGER NOT NULL,
    `isChannelGenerateCompleted` BOOLEAN NOT NULL,
    `totalChannelCnt` INTEGER NOT NULL,
    `completedChannelCnt` INTEGER NOT NULL,
    `isChannelGenerationCompleted` BOOLEAN NOT NULL,
    `isGuildDescriptionGenerationCompleted` BOOLEAN NOT NULL,
    `isGuildTagGenerationCompleted` BOOLEAN NOT NULL,
    `isGuildMemberGenerationCompleted` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `GuildBatch_guildId_key`(`guildId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_batchId_fkey` FOREIGN KEY (`batchId`) REFERENCES `GuildBatch`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GuildBatch` ADD CONSTRAINT `GuildBatch_guildId_fkey` FOREIGN KEY (`guildId`) REFERENCES `Guild`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
