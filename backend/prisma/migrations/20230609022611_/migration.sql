/*
  Warnings:

  - Added the required column `isOwner` to the `GuildMember` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `GuildMember` ADD COLUMN `isOwner` BOOLEAN NOT NULL;
