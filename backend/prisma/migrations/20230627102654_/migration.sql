/*
  Warnings:

  - Added the required column `name` to the `GuildMember` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `GuildMember` ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `GuildRole` MODIFY `hexColor` VARCHAR(191) NOT NULL;
