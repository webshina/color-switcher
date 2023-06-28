import {
  Guild,
  GuildMember,
  GuildRole,
  GuildTag,
} from '../../backend/node_modules/.prisma/client';
import { ChannelItem } from './Channel';

export type GuildTagItem = Omit<GuildTag, 'createdAt' | 'updatedAt'>;

export type GuildRoleItem = Omit<
  GuildRole,
  'permissions' | 'createdAt' | 'updatedAt'
> & {
  permissions: string;
};

export type GuildMemberItem = Omit<
  GuildMember,
  'permissions' | 'createdAt' | 'updatedAt'
> & {
  permissions: string;
  roles: GuildRoleItem[];
};

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
