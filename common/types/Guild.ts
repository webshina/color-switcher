import {
  Guild,
  GuildMember,
  GuildPost,
  GuildRole,
  GuildTag,
  NotificationToGuildManager,
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

export type NotificationToGuildManagerItem = Omit<
  NotificationToGuildManager,
  'createdAt' | 'updatedAt'
>;

export type GuildAnnouncementItem = {
  message: {
    id: number;
    content: string;
  };
  author: {
    id: number;
    discordId: string;
    displayName: string;
    avatarURL: string;
  };
  hideAsAnnouncement: boolean;
  postedAt: Date;
};

export type GuildItem = Omit<
  Guild,
  'coverImage' | 'createdAt' | 'updatedAt'
> & {
  coverImageUrl?: string | null;
  availableChannelCnt: number;
  createdChannelCnt: number;
  lastSyncedAt?: Date;
  categories: ChannelCategoryItem[];
  tags: GuildTagItem[];
  members: GuildMemberItem[];
  membersCnt: number;
  managementMembers: GuildMemberItem[];
  posts: GuildPostItem[];
  notificationsToGuildManager: NotificationToGuildManagerItem[];
  announcements: GuildAnnouncementItem[];
};
