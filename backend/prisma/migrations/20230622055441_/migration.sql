/*
  Warnings:

  - You are about to drop the column `desctiption` on the `Guild` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Guild` DROP COLUMN `desctiption`,
    ADD COLUMN `description` LONGTEXT NULL;
