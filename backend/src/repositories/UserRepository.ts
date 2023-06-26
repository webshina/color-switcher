import { UserItem } from '#/common/types/User';
import { prisma } from '@/lib/prisma';
import { User } from '@prisma/client';
import axios from 'axios';
import { Request } from 'express';

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
    const userItem: UserItem = {
      id: user.id,
      discordId: user.discordId,
      discordAccessToken: user.discordAccessToken,
      guilds: guildMembers.map((guildMember) => ({
        id: guildMember.guild.id,
        discordId: guildMember.guild.discordId,
        name: guildMember.guild.name,
        isPrivate: guildMember.guild.isPrivate,
        inProgress: guildMember.guild.inProgress,
        iconURL: guildMember.guild.iconURL,
        isOwner: guildMember.isOwner,
        permissions: guildMember.permissions,
        manageable:
          guildMember.isOwner ||
          this.hasPermission(guildMember.permissions, 'MANAGE_GUILD'),
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

  static async fetchAdminGuilds(userId: number) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) throw new Error('User not found');

    // Get guilds that the user is an admin of
    const { data: fetchedGuilds } = await axios.get(
      'https://discord.com/api/users/@me/guilds',
      {
        headers: {
          authorization: `Bearer ${user.discordAccessToken}`,
        },
      }
    );

    const adminGuilds: {
      id: number;
      discordId: string;
      name: string;
    }[] = [];
    for (const fetchedGuild of fetchedGuilds) {
      if (this.hasPermission(fetchedGuild.permissions, 'MANAGE_GUILD')) {
        adminGuilds.push({
          id: fetchedGuild.id,
          discordId: fetchedGuild.id,
          name: fetchedGuild.name,
        });
      }
    }

    return adminGuilds;
  }

  static hasPermission(permissions: number, permissionType: 'MANAGE_GUILD') {
    const permissionTypes = {
      MANAGE_GUILD: 0x20,
    };
    const permissionHex = permissionTypes[permissionType];
    return (
      // Check if the user has the MANAGE_GUILD permission by doing a bitwise AND
      (permissions & permissionHex) === permissionHex
    );
  }
}
