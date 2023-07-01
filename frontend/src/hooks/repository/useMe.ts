import { UserItem } from '#/common/types/User';
import { get } from '@/utils/apiHelper';
import useSWR from 'swr';

export const useMe = () => {
  const { ...swr } = useSWR('useMe', async () => {
    try {
      const res = await get('/api/user/me');
      return res.data as UserItem;
    } catch (e) {
      return null;
    }
  });

  return {
    ...swr,
  };
};
