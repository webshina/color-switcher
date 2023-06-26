/*
  Warnings:

  - You are about to drop the column `permissions` on the `GuildMember` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `GuildMember` DROP FOREIGN KEY `GuildMember_userId_fkey`;

-- AlterTable
ALTER TABLE `GuildMember` DROP COLUMN `permissions`,
    MODIFY `userId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `GuildMember` ADD CONSTRAINT `GuildMember_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
