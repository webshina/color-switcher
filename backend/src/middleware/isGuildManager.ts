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

  // Fetch my guild member data
  const myGuildMemberData = await prisma.guildMember.findFirst({
    where: {
      guildId: guildData?.id,
      userId: userItem.id,
    },
  });

  if (myGuildMemberData) {
    const isManager = GuildMemberRepository.hasPermission(
      Number(myGuildMemberData.permissions),
      'MANAGE_GUILD'
    );
    if (!isManager) {
      return res.status(401).json('You are not the manager of this guild.');
    }
  }

  // If Guilds or GuildMembers is not registered, fetch management members from Bot
  if (!guildData || !myGuildMemberData) {
    try {
      const fetchedManagementMembers =
        await GuildMemberRepository.fetchManagementMembersFromBot(
          paramGuildDiscordId
        );
      const managementMembers = fetchedManagementMembers.map((member) => ({
        discordId: member.id,
      }));

      // Check if user is management member
      const isGuildManager = managementMembers.find((managementMember) => {
        return managementMember.discordId === userItem.discordId;
      })
        ? true
        : false;
      if (!isGuildManager) {
        return res.status(401).json('You are not the manager of this guild.');
      }
    } catch (error) {
      if (isError(error)) {
        if (error.message === messages.botNotInstalled) {
          return res.status(400).json(messages.botNotInstalled);
        }
      }
    }
  }

  next();
};
