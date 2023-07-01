import { GuildItem } from '#/common/types/Guild';
import { GuildRepository } from '@/repositories/GuildRepository';
import { UserRepository } from '@/repositories/UserRepository';
import { NextFunction, Request, Response } from 'express';

export const isGuildManager = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check if guild id exists
  const paramGuildId = req.params.guildId;
  const paramGuildDiscordId = req.params.guildDiscordId;
  if (!paramGuildId && !paramGuildDiscordId)
    return res.status(400).json('Guild ID is required');

  // Check if guild exists
  let guildData: GuildItem | null = null;
  let guildExists = false;
  if (paramGuildId) {
    guildData = await GuildRepository.getById(Number(paramGuildId));
    if (guildData) guildExists = true;
  }
  if (paramGuildDiscordId) {
    guildData = await GuildRepository.getByDiscordId(paramGuildDiscordId);
    if (guildData) guildExists = true;
  }
  if (!guildExists) return res.status(404).json('Guild not found');

  // Check if user is guild manager
  const userItem = await UserRepository.getLoginUser(req);
  if (!userItem) return res.status(401).json('Unauthorized');
  const isGuildManager = guildData!.managementMembers.find(
    (managementMember) => {
      return managementMember.discordId === userItem.discordId;
    }
  )
    ? true
    : false;
  if (!isGuildManager) {
    return res.status(403).json('You are not the owner of this guild.');
  }

  next();
};
