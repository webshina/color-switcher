import { prisma } from '@/lib/prisma';
import { GuildStatus } from '@prisma/client';

export class GuildRepository {
  static async provision(data: {
    discordId: string;
    name: string;
    status: GuildStatus;
    iconURL?: string;
  }) {
    await prisma.guild.create({
      data,
    });
  }
}
