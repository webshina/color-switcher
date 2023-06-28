/*
  Warnings:

  - You are about to drop the column `positions` on the `GuildRole` table. All the data in the column will be lost.
  - Added the required column `position` to the `GuildRole` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `GuildRole` DROP COLUMN `positions`,
    ADD COLUMN `position` INTEGER NOT NULL;
