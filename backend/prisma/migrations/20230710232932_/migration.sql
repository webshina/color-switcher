/*
  Warnings:

  - A unique constraint covering the columns `[guildId,discordId]` on the table `GuildMember` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `GuildMember_discordId_key` ON `GuildMember`;

-- CreateIndex
CREATE UNIQUE INDEX `GuildMember_guildId_discordId_key` ON `GuildMember`(`guildId`, `discordId`);
