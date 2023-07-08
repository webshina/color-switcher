import { GuildItem } from '#/common/types/Guild';
import { GuildMemberRepository } from '@/repositories/GuildMemberRepository';
import { GuildRepository } from '@/repositories/GuildRepository';
import { UserRepository } from '@/repositories/UserRepository';
import { NextFunction, Request, Response } from 'express';

export const isGuildManager = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get login user
  const userItem = await UserRepository.getLoginUser(req);
  if (!userItem) return res.status(401).json('Unauthorized');

  // Check if guild id exists
  const paramGuildId = req.params.guildId;
  const paramGuildDiscordId = req.params.guildDiscordId;
  if (!paramGuildId && !paramGuildDiscordId)
    return res.status(400).json('Guild ID is required');

  // Fetch guild management members
  let guildData: GuildItem | null = null;
  let managementMembers: { discordId: string }[] = [];
  if (paramGuildId) {
    guildData = await GuildRepository.getByDiscordId(paramGuildId);
    managementMembers = guildData!.managementMembers.map(
      (managementMember) => ({
        discordId: managementMember.discordId,
      })
    );
  } else if (paramGuildDiscordId) {
    try {
      guildData = await GuildRepository.getByDiscordId(paramGuildDiscordId);
      managementMembers = guildData!.managementMembers.map(
        (managementMember) => ({
          discordId: managementMember.discordId,
        })
      );
    } catch (error) {
      // If guild is not registered, fetch management members from bot
      const fetchedManagementMembers =
        await GuildMemberRepository.fetchManagementMembersFromBot(
          paramGuildDiscordId
        );
      managementMembers = fetchedManagementMembers.map((member) => ({
        discordId: member.id,
      }));
    }
  }

  // Check if user is management member
  const isGuildManager = managementMembers.find((managementMember) => {
    return managementMember.discordId === userItem.discordId;
  })
    ? true
    : false;
  if (!isGuildManager) {
    return res.status(403).json('You are not the owner of this guild.');
  }

  next();
};
