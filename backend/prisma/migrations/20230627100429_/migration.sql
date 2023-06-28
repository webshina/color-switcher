/*
  Warnings:

  - A unique constraint covering the columns `[discordId]` on the table `GuildRole` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `GuildRole_discordId_key` ON `GuildRole`(`discordId`);
