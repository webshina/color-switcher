-- CreateTable
CREATE TABLE `GuildRole` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `discordId` VARCHAR(191) NOT NULL,
    `guildId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GuildMemberRoleRelation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `guildMemberId` INTEGER NOT NULL,
    `guildRoleId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GuildRole` ADD CONSTRAINT `GuildRole_guildId_fkey` FOREIGN KEY (`guildId`) REFERENCES `Guild`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GuildMemberRoleRelation` ADD CONSTRAINT `GuildMemberRoleRelation_guildMemberId_fkey` FOREIGN KEY (`guildMemberId`) REFERENCES `GuildMember`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GuildMemberRoleRelation` ADD CONSTRAINT `GuildMemberRoleRelation_guildRoleId_fkey` FOREIGN KEY (`guildRoleId`) REFERENCES `GuildRole`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
