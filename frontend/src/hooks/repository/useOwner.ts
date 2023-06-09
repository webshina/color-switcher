import { get } from '@/utils/apiHelper';
import useSWR from 'swr';

export const useShop = (props: { ownerId: number }) => {
  const { ...swr } = useSWR(props.ownerId ? 'useOwner' : null, async () => {
    const res = await get('/api/owner', {
      id: props.ownerId,
    });
    const { owner } = res.data;
    return owner;
  });

  return {
    ...swr,
  };
};
