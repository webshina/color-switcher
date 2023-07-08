/*
  Warnings:

  - You are about to drop the column `isManager` on the `GuildMember` table. All the data in the column will be lost.
  - You are about to drop the column `isOwner` on the `GuildMember` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `GuildMember` DROP COLUMN `isManager`,
    DROP COLUMN `isOwner`;
