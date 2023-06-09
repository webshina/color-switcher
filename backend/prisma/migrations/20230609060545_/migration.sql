-- AlterTable
ALTER TABLE `User` MODIFY `discordAccessToken` VARCHAR(191) NULL,
    MODIFY `discordRefreshToken` VARCHAR(191) NULL,
    MODIFY `discordTokenExpiresAt` DATETIME(3) NULL;
