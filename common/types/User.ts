import { User } from '../../backend/node_modules/.prisma/client';

export type UserItem = Omit<
  User,
  | 'discordTokenExpiresAt'
  | 'discordRefreshToken'
  | 'isAdmin'
  | 'createdAt'
  | 'updatedAt'
> & {
  guilds: {
    id: number;
    discordId: String;
    name: String;
    iconURL: String | null;
    permissions: number;
    isOwner: boolean;
    isManager: boolean;
  }[];
};
