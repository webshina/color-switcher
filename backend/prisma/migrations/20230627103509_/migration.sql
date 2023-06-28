/*
  Warnings:

  - You are about to drop the column `guildDiscordId` on the `GuildMember` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `GuildMember` DROP COLUMN `guildDiscordId`;
