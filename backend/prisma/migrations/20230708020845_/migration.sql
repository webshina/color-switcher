/*
  Warnings:

  - A unique constraint covering the columns `[guildId,name]` on the table `GuildPost` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `GuildPost_guildId_name_key` ON `GuildPost`(`guildId`, `name`);
