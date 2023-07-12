-- AlterTable
ALTER TABLE `GuildMember` ADD COLUMN `isManager` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `isOwner` BOOLEAN NOT NULL DEFAULT false;
