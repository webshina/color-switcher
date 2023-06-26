/*
  Warnings:

  - Added the required column `permissions` to the `GuildMember` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `GuildMember` ADD COLUMN `permissions` INTEGER NOT NULL;
