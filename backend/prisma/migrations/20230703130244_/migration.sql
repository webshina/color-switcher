/*
  Warnings:

  - You are about to drop the column `autoGenerate` on the `Channel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Channel` DROP COLUMN `autoGenerate`,
    ADD COLUMN `autoGenerateSummary` BOOLEAN NOT NULL DEFAULT true;
