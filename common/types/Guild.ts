import { Guild, GuildTag } from '../../backend/node_modules/.prisma/client';
import { ChannelItem } from './Channel';
import { GuildMemberItem } from './GuildMember';

export type GuildTagItem = Omit<GuildTag, 'createdAt' | 'updatedAt'>;

export type GuildItem = Omit<
  Guild,
  'coverImage' | 'createdAt' | 'updatedAt'
> & {
  coverImageUrl?: string | null;
  availableChannelCnt: number;
  createdChannelCnt: number;
  channels: ChannelItem[];
  tags: GuildTagItem[];
  members: GuildMemberItem[];
};
