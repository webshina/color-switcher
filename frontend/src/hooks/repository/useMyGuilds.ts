import { FetchGuildResponse } from '#/common/types/apiResponses/GuildControllerResponse';
import { get } from '@/utils/apiHelper';
import useSWR from 'swr';

export const useMyGuilds = () => {
  const { ...swr } = useSWR('useMyGuilds', async () => {
    const res = await get('/api/guild/mine');
    return res.data as FetchGuildResponse[];
  });

  return {
    ...swr,
  };
};
