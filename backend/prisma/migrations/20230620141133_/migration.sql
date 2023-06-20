/*
  Warnings:

  - You are about to drop the column `channelId` on the `ChannelCategory` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `ChannelCategory` DROP FOREIGN KEY `ChannelCategory_channelId_fkey`;

-- AlterTable
ALTER TABLE `Channel` ADD COLUMN `categoryId` INTEGER NULL;

-- AlterTable
ALTER TABLE `ChannelCategory` DROP COLUMN `channelId`;

-- AddForeignKey
ALTER TABLE `Channel` ADD CONSTRAINT `Channel_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `ChannelCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
