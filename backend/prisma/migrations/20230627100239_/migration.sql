/*
  Warnings:

  - You are about to alter the column `positions` on the `GuildRole` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - Added the required column `permissions` to the `GuildRole` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `GuildRole` ADD COLUMN `permissions` BIGINT NOT NULL,
    MODIFY `positions` INTEGER NOT NULL;
