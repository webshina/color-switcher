/*
  Warnings:

  - You are about to alter the column `color` on the `GuildRole` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `BigInt`.

*/
-- AlterTable
ALTER TABLE `GuildRole` MODIFY `color` BIGINT NOT NULL;
