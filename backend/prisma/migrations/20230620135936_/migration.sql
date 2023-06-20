/*
  Warnings:

  - Added the required column `discordId` to the `ChannelCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ChannelCategory` ADD COLUMN `discordId` VARCHAR(191) NOT NULL;
