/*
  Warnings:

  - You are about to drop the column `messageFrequencyScore` on the `Channel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Channel` DROP COLUMN `messageFrequencyScore`,
    ADD COLUMN `messagesPerDay` DOUBLE NULL;
