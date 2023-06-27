-- AlterTable
ALTER TABLE `GuildMember` ADD COLUMN `activityScore` INTEGER NULL,
    ADD COLUMN `avatarURL` VARCHAR(191) NULL,
    ADD COLUMN `displayName` VARCHAR(191) NULL,
    ADD COLUMN `joinedAt` DATETIME(3) NULL;
