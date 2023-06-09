/*
  Warnings:

  - A unique constraint covering the columns `[discordAccessToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[discordRefreshToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `User_discordAccessToken_key` ON `User`(`discordAccessToken`);

-- CreateIndex
CREATE UNIQUE INDEX `User_discordRefreshToken_key` ON `User`(`discordRefreshToken`);
