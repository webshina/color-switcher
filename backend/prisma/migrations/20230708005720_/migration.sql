/*
  Warnings:

  - The values [Managemer] on the enum `GuildMemberPost_name` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `GuildMemberPost` MODIFY `name` ENUM('MANAGER') NOT NULL;
