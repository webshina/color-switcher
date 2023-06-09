/*
  Warnings:

  - You are about to drop the column `icon` on the `Guild` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Guild` DROP COLUMN `icon`,
    ADD COLUMN `iconURL` VARCHAR(191) NOT NULL DEFAULT '';
