import { GuildStatus, User } from '../backend/node_modules/.prisma/client';

export type UserItem = Omit<
  User,
  'discordTokenExpiresAt' | 'discordRefreshToken' | 'createdAt' | 'updatedAt'
> & {
  guilds: {
    id: number;
    discordId: String;
    name: String;
    status: GuildStatus;
    iconURL: String | null;
    isOwner: boolean;
    permissions: number;
    manageable: boolean;
  }[];
};
