/*
  Warnings:

  - Added the required column `discordAccessToken` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discordRefreshToken` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discordTokenExpiresAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `discordAccessToken` VARCHAR(191) NOT NULL,
    ADD COLUMN `discordRefreshToken` VARCHAR(191) NOT NULL,
    ADD COLUMN `discordTokenExpiresAt` DATETIME(3) NOT NULL;
