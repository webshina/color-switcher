import { User } from 'prisma/prisma-client';

export type UserItem = Omit<
  User,
  'discordTokenExpiresAt' | 'discordRefreshToken' | 'createdAt' | 'updatedAt'
>;
