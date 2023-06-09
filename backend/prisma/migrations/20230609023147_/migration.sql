/*
  Warnings:

  - Added the required column `guildDiscordId` to the `GuildMember` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `GuildMember` ADD COLUMN `guildDiscordId` VARCHAR(191) NOT NULL;
