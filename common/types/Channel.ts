import { Channel } from '../../backend/node_modules/.prisma/client';

export type ChannelItem = Omit<Channel, 'image' | 'createdAt' | 'updatedAt'> & {
  imageURL: string | null;
};
