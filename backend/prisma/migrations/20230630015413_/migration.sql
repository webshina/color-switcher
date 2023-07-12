/*
  Warnings:

  - You are about to drop the column `lastSyncedAt` on the `Guild` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Guild` DROP COLUMN `lastSyncedAt`;

-- AlterTable
ALTER TABLE `GuildBatch` ADD COLUMN `isCompleted` BOOLEAN NOT NULL DEFAULT false;
