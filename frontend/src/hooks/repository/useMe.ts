import { UserItem } from '#/types/User';
import { get } from '@/utils/apiHelper';
import useSWR from 'swr';

export const useMe = () => {
  const { ...swr } = useSWR('useMe', async () => {
    const res = await get('/api/user/me');
    return res.data as UserItem;
  });

  return {
    ...swr,
  };
};
