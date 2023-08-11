import { messages } from '#/common/constants/messages';
import { prisma } from '@/lib/prisma';
import { GuildMemberRepository } from '@/repositories/GuildMemberRepository';
import { UserRepository } from '@/repositories/UserRepository';
import { isError } from '@/utils/typeNarrower';
import { Guild } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

export const isGuildManager = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get login user
  const userItem = await UserRepository.getLoginUser(req);
  if (!userItem) return res.status(401).json('Unauthorized');

  // Check if guild id exists in params
  const paramGuildId = req.params.guildId;
  const paramGuildDiscordId = req.params.guildDiscordId;
  if (!paramGuildId && !paramGuildDiscordId)
    return res.status(400).json('Guild ID is required');

  // Fetch Guild Data
  let guildData: Guild | null = null;
  if (paramGuildId) {
    guildData = await prisma.guild.findUnique({
      where: {
        id: Number(paramGuildId),
      },
    });
  } else if (paramGuildDiscordId) {
    guildData = await prisma.guild.findUnique({
      where: {
        discordId: paramGuildDiscordId,
      },
    });
  }
  if (!guildData) {
    return res.status(404).json('Guild not found');
  }

  // Fetch guild management members
  let managementMembers: { discordId: string }[] = [];
  if (paramGuildId) {
    const members = await prisma.guildMember.findMany({
      where: {
        guildId: guildData.id,
      },
    });
    managementMembers = members
      .filter((member) =>
        GuildMemberRepository.hasPermission(member.id, 'MANAGE_GUILD')
      )
      .map((member) => ({
        discordId: member.discordId,
      }));
  } else if (paramGuildDiscordId) {
    try {
      const members = await prisma.guildMember.findMany({
        where: {
          guildId: guildData.id,
        },
      });
      managementMembers = members
        .filter((member) =>
          GuildMemberRepository.hasPermission(member.id, 'MANAGE_GUILD')
        )
        .map((member) => ({
          discordId: member.discordId,
        }));
    } catch (error) {
      // pass
    }

    // If guild is not registered, fetch management members from bot
    if (managementMembers.length === 0) {
      try {
        const fetchedManagementMembers =
          await GuildMemberRepository.fetchManagementMembersFromBot(
            paramGuildDiscordId
          );
        managementMembers = fetchedManagementMembers.map((member) => ({
          discordId: member.id,
        }));
      } catch (error) {
        if (isError(error)) {
          if (error.message === messages.botNotInstalled) {
            return res.status(400).json(messages.botNotInstalled);
          }
        }
      }
    }
  }

  // Check if user is management member
  const isGuildManager = managementMembers.find((managementMember) => {
    return managementMember.discordId === userItem.discordId;
  })
    ? true
    : false;
  if (!isGuildManager) {
    return res.status(401).json('You are not the manager of this guild.');
  }

  next();
};
