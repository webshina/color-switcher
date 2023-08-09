import { GuildMemberItem } from '#/common/types/Guild';
import { GetGuildMembersResponse } from '#/common/types/apiResponses/GuildMemberControllerResponse';
import { useInfiniteLoad } from '@/components/hooks/utils/useInfiniteLoad';
import { get } from '@/utils/apiHelper';

export const useMembers = (props: { guildId: number }) => {
  const {
    data: membersPages,
    isLoadingMore,
    isEnd,
    size,
    setSize,
    mutate,
  } = useInfiniteLoad<GuildMemberItem>(
    `/api/guild/${props.guildId}/members`,
    async (url, pageIdx, pageSize) => {
      const res = await get(url, {
        pageIdx,
        pageSize,
      });
      const members = res.data as GetGuildMembersResponse;
      return members;
    },
    3
  );

  return {
    membersPages,
    isLoadingMore,
    isEnd,
    size,
    setSize,
    mutate,
  };
};
