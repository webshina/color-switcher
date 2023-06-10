import { prisma } from '@/lib/prisma';
import { User } from '@prisma/client';
import { Request } from 'express';
import { UserItem } from '../../../types/User';

export class UserRepository {
  static async format(user: User) {
    const guildMembers = await prisma.guildMember.findMany({
      where: {
        userId: user.id,
      },
      include: {
        guild: true,
      },
    });
    const MANAGE_GUILD = 0x20;
    const userItem: UserItem = {
      id: user.id,
      discordId: user.discordId,
      discordAccessToken: user.discordAccessToken,
      guilds: guildMembers.map((guildMember) => ({
        id: guildMember.guild.id,
        discordId: guildMember.guild.discordId,
        name: guildMember.guild.name,
        status: guildMember.guild.status,
        iconURL: guildMember.guild.iconURL,
        isOwner: guildMember.isOwner,
        permissions: guildMember.permissions,
        manageable:
          guildMember.isOwner ||
          // Check if the user has the MANAGE_GUILD permission by doing a bitwise AND
          (guildMember.permissions & MANAGE_GUILD) === MANAGE_GUILD,
      })),
    };

    return userItem;
  }

  static async getById(id: number) {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!user) throw new Error('User not found');
    return this.format(user);
  }

  static async getByAccessToken(accessToken: string) {
    if (!accessToken) return null;

    const user = await prisma.user.findUnique({
      where: {
        discordAccessToken: accessToken,
      },
    });

    if (!user) return null;

    return this.format(user);
  }

  static async getLoginUser(req: Request) {
    const user = await this.getByAccessToken(req.cookies.accessToken);
    if (!user) throw new Error('User not found');
    return user;
  }
}
