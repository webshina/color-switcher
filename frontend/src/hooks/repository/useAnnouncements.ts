import { GuildAnnouncementItem } from '#/common/types/Guild';
import { GetGuildAnnouncementsResponse } from '#/common/types/apiResponses/GuildControllerResponse';
import { useInfiniteLoad } from '@/components/hooks/utils/useInfiniteLoad';
import { get } from '@/utils/apiHelper';

export const useAnnouncements = (props: { guildId: number }) => {
  const {
    data: announcementsPages,
    isLoadingMore,
    isEnd,
    size,
    setSize,
  } = useInfiniteLoad<GuildAnnouncementItem>(
    `/api/guild/${props.guildId}/announcements`,
    async (url, pageIdx, pageSize) => {
      const res = await get(url, {
        pageIdx,
        pageSize,
      });
      const announcements = res.data as GetGuildAnnouncementsResponse;
      return announcements;
    },
    3
  );

  return {
    announcementsPages,
    isLoadingMore,
    isEnd,
    size,
    setSize,
  };
};
