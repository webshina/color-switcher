import { GuildMemberItem } from '#/common/types/Guild';
import { get } from '@/utils/apiHelper';
import useSWR from 'swr';

export const useMembers = (props: { guildId: number }) => {
  const { ...swr } = useSWR('useMembers', async () => {
    try {
      const res = await get(`/api/guild/${props.guildId}/members`);
      console.log(res);
      return res.data as GuildMemberItem[];
    } catch (e) {
      return null;
    }
  });

  return {
    ...swr,
  };
};
