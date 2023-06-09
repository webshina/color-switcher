import { Guild } from '../backend/node_modules/.prisma/client';

export type GuildItem = Omit<Guild, 'createdAt' | 'updatedAt'>;
