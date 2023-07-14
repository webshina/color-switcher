import { GetBatchProgressResponse } from '#/common/types/apiResponses/GuildControllerResponse';
import { get } from '@/utils/apiHelper';
import useSWR from 'swr';

export const useGuildBatchProgress = (props: { guildBatchId?: number }) => {
  const { ...swr } = useSWR(
    props.guildBatchId ? 'useGuildBatchProgress' : null,
    async () => {
      const res = await get('/api/guild/progress/' + props.guildBatchId);
      return res.data as GetBatchProgressResponse;
    },
    {
      refreshInterval: 1000,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    ...swr,
  };
};
