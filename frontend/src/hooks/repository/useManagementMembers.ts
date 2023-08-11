import { GuildMemberItem } from '#/common/types/Guild';
import { get } from '@/utils/apiHelper';
import useSWR from 'swr';

export const useManagementMembers = (props: { guildId: number }) => {
  const { ...swr } = useSWR('useManagementMembers', async () => {
    try {
      const res = await get(`/api/guild/${props.guildId}/management-members`);
      return res.data as GuildMemberItem[];
    } catch (e) {
      return null;
    }
  });

  return {
    ...swr,
  };
};
