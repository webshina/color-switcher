import { GuildItem } from '../Guild';

export type GenerateGuildResponse = {
  guildId: number;
  guildBatchId: number;
};
export type FetchGuildResponse = GuildItem & {
  isMember?: boolean;
};
export type GetBatchProgressResponse = {
  progressRate: number;
};
