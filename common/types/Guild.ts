import {
  Guild,
  GuildMember,
  GuildPost,
  GuildRole,
  GuildTag,
} from '../../backend/node_modules/.prisma/client';
import { ChannelCategoryItem } from './Channel';

export type GuildTagItem = Omit<GuildTag, 'createdAt' | 'updatedAt'>;

export type GuildRoleItem = Omit<
  GuildRole,
  'permissions' | 'createdAt' | 'updatedAt'
> & {
  permissions: string;
};

export type GuildPostItem = Omit<GuildPost, 'createdAt' | 'updatedAt'>;

export type GuildMemberItem = Omit<
  GuildMember,
  'permissions' | 'createdAt' | 'updatedAt'
> & {
  permissions: string;
  isOwner: boolean;
  isManager: boolean;
  roles: GuildRoleItem[];
  posts: GuildPostItem[];
};

export type GuildItem = Omit<
  Guild,
  'coverImage' | 'createdAt' | 'updatedAt'
> & {
  coverImageUrl?: string | null;
  availableChannelCnt: number;
  createdChannelCnt: number;
  categories: ChannelCategoryItem[];
  tags: GuildTagItem[];
  members: GuildMemberItem[];
  managementMembers: GuildMemberItem[];
  posts: GuildPostItem[];
};
