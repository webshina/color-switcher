/*
  Warnings:

  - You are about to drop the column `status` on the `Guild` table. All the data in the column will be lost.
  - Added the required column `inProgress` to the `Guild` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isPrivate` to the `Guild` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Guild` DROP COLUMN `status`,
    ADD COLUMN `inProgress` BOOLEAN NOT NULL,
    ADD COLUMN `isPrivate` BOOLEAN NOT NULL;
