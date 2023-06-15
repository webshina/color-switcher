/*
  Warnings:

  - Made the column `messageFrequencyScore` on table `Channel` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Channel` ADD COLUMN `image` VARCHAR(191) NULL,
    MODIFY `messageFrequencyScore` DOUBLE NOT NULL;
