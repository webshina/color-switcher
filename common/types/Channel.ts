import {
  Channel,
  ChannelCategory,
  ChannelSummary,
} from '../../backend/node_modules/.prisma/client';

export type ChannelCategoryItem = Omit<
  ChannelCategory,
  'createdAt' | 'updatedAt'
> & {
  channels: ChannelItem[];
};

export type ChannelSummaryItem = Omit<
  ChannelSummary,
  'createdAt' | 'updatedAt'
>;

export type ChannelItem = Omit<Channel, 'image' | 'createdAt' | 'updatedAt'> & {
  imageURL: string | null;
  category: { id: number; name: string } | null;
  summaries: ChannelSummaryItem[];
};
