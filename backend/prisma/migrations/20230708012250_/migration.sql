/*
  Warnings:

  - You are about to drop the `GuildMemberPost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `GuildMemberPost` DROP FOREIGN KEY `GuildMemberPost_guildMemberId_fkey`;

-- DropTable
DROP TABLE `GuildMemberPost`;

-- CreateTable
CREATE TABLE `GuildPost` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `guildId` INTEGER NOT NULL,
    `name` ENUM('MANAGER') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GuildMemberPostRelation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `guildMemberId` INTEGER NOT NULL,
    `guildPostId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `GuildMemberPostRelation_guildMemberId_guildPostId_key`(`guildMemberId`, `guildPostId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GuildPost` ADD CONSTRAINT `GuildPost_guildId_fkey` FOREIGN KEY (`guildId`) REFERENCES `Guild`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GuildMemberPostRelation` ADD CONSTRAINT `GuildMemberPostRelation_guildMemberId_fkey` FOREIGN KEY (`guildMemberId`) REFERENCES `GuildMember`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GuildMemberPostRelation` ADD CONSTRAINT `GuildMemberPostRelation_guildPostId_fkey` FOREIGN KEY (`guildPostId`) REFERENCES `GuildPost`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
