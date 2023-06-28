/*
  Warnings:

  - Added the required column `color` to the `GuildRole` table without a default value. This is not possible if the table is not empty.
  - Added the required column `positions` to the `GuildRole` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `GuildRole` ADD COLUMN `color` VARCHAR(191) NOT NULL,
    ADD COLUMN `positions` BIGINT NOT NULL;
