/*
  Warnings:

  - The values [provisional] on the enum `Guild_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Guild` MODIFY `status` ENUM('initializing', 'private', 'published') NOT NULL;
