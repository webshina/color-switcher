/*
  Warnings:

  - A unique constraint covering the columns `[guildMemberId,guildRoleId]` on the table `GuildMemberRoleRelation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `GuildMemberRoleRelation_guildMemberId_guildRoleId_key` ON `GuildMemberRoleRelation`(`guildMemberId`, `guildRoleId`);
