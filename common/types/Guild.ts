import { Guild } from '../../backend/node_modules/.prisma/client';
import { ChannelItem } from './Channel';

export type GuildItem = Omit<Guild, 'createdAt' | 'updatedAt'> & {
  availableChannelCnt: number;
  createdChannelCnt: number;
  channels: ChannelItem[];
};
