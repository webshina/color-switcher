import { GuildAnnouncementItem, GuildItem } from '../Guild';

export type GenerateGuildResponse = {
  guildId: number;
  guildBatchId: number;
};
export type FetchGuildResponse = GuildItem & {
  isMember?: boolean;
  isManager?: boolean;
};
export type GetGuildAnnouncementsResponse = GuildAnnouncementItem[];
export type GetBatchProgressResponse = {
  progressRate: number;
};
