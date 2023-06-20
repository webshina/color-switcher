/*
  Warnings:

  - A unique constraint covering the columns `[guildId,discordId]` on the table `ChannelCategory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `guildId` to the `ChannelCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ChannelCategory` ADD COLUMN `guildId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `ChannelCategory_guildId_discordId_key` ON `ChannelCategory`(`guildId`, `discordId`);

-- AddForeignKey
ALTER TABLE `ChannelCategory` ADD CONSTRAINT `ChannelCategory_guildId_fkey` FOREIGN KEY (`guildId`) REFERENCES `Guild`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
