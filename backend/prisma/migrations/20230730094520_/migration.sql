-- AlterTable
ALTER TABLE `Channel` ADD COLUMN `isAnnouncementChannel` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `GuildBatch` ADD COLUMN `isGuildAnnouncementGenerationCompleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Message` ADD COLUMN `postedAt` DATETIME(3) NOT NULL DEFAULT '1990-01-01T00:00:00+00:00';
