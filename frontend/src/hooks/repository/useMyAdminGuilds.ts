import { MyAdminGuildsResponse } from '#/common/types/apiResponses/UserControllerResponse';
import { get } from '@/utils/apiHelper';
import useSWR from 'swr';

export const useMyAdminGuilds = () => {
  const { ...swr } = useSWR('useMyAdminGuilds', async () => {
    const res = await get('/api/user/admin-guilds');
    return res.data as MyAdminGuildsResponse;
  });

  return {
    ...swr,
  };
};
