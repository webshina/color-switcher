-- AlterTable
ALTER TABLE `Guild` ADD COLUMN `autoGenerateShareMessage` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `inviteURL` VARCHAR(191) NULL;
