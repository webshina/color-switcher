import { GetBatchProgressResponse } from '#/common/types/apiResponses/GuildControllerResponse';
import { get } from '@/utils/apiHelper';
import useSWR from 'swr';

export const useGuildBatchProgress = (props: { guildId?: number }) => {
  const { ...swr } = useSWR(
    props.guildId ? 'useGuildBatchProgress' : null,
    async () => {
      const res = await get('/api/guild/progress/' + props.guildId);
      return res.data as GetBatchProgressResponse;
    },
    { refreshInterval: 500 }
  );

  return {
    ...swr,
  };
};
