/*
  Warnings:

  - You are about to drop the `AnnouncementToGuildManager` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `AnnouncementToGuildManager` DROP FOREIGN KEY `AnnouncementToGuildManager_guildId_fkey`;

-- DropTable
DROP TABLE `AnnouncementToGuildManager`;

-- CreateTable
CREATE TABLE `NotificationToGuildManager` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `guildId` INTEGER NOT NULL,
    `name` ENUM('INSTRUCTION_FOR_POST_TO_CHANNEL', 'INSTRUCTION_FOR_POST_TO_SOCIAL_MEDIA') NOT NULL,
    `isShow` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `NotificationToGuildManager_guildId_name_key`(`guildId`, `name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `NotificationToGuildManager` ADD CONSTRAINT `NotificationToGuildManager_guildId_fkey` FOREIGN KEY (`guildId`) REFERENCES `Guild`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
