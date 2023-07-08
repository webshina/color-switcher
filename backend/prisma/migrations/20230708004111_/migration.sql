-- CreateTable
CREATE TABLE `GuildMemberPost` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `guildMemberId` INTEGER NOT NULL,
    `name` ENUM('ManagementTeam') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GuildMemberPost` ADD CONSTRAINT `GuildMemberPost_guildMemberId_fkey` FOREIGN KEY (`guildMemberId`) REFERENCES `GuildMember`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
