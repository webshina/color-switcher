import { User } from '../backend/node_modules/.prisma/client';

export type UserItem = Omit<
  User,
  'discordTokenExpiresAt' | 'discordRefreshToken' | 'createdAt' | 'updatedAt'
>;
