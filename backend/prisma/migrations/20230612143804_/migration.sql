/*
  Warnings:

  - A unique constraint covering the columns `[channelId,discordId]` on the table `Message` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Message_channelId_discordId_key` ON `Message`(`channelId`, `discordId`);
