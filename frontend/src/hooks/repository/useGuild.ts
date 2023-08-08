import { FetchGuildResponse } from '#/common/types/apiResponses/GuildControllerResponse';
import { get } from '@/utils/apiHelper';
import useSWR from 'swr';

export const useGuild = (props: { guildId: number }) => {
  const { ...swr } = useSWR(
    props.guildId ? 'useGuild' : null,
    async () => {
      const res = await get('/api/guild/' + props.guildId);
      return res.data as FetchGuildResponse;
    },
    {
      revalidateOnFocus: false,
    }
  );

  return {
    ...swr,
  };
};
