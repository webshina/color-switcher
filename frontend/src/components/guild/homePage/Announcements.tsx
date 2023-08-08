import React from 'react';
import { AiFillDownCircle, AiOutlineNotification } from 'react-icons/ai';

import { GuildAnnouncementItem } from '#/common/types/Guild';
import { FetchGuildResponse } from '#/common/types/apiResponses/GuildControllerResponse';
import { useInfiniteLoad } from '@/components/hooks/utils/useInfiniteLoad';
import { LoadingSpinner } from '@/components/utils/LoadingSpinner';
import Title from '@/components/utils/Title';
import { get } from '@/utils/apiHelper';
import { AnnouncementCard } from './AnnouncementCard';

type Props = {
  guildId: number;
};

export const Announcements: React.FC<Props> = (props) => {
  const { data, isLoadingMore, isEnd, size, setSize } =
    useInfiniteLoad<GuildAnnouncementItem>(
      `/api/guild/${props.guildId}`,
      async (url, index, pageSize) => {
        const res = await get(url, {
          announcementsPageIdx: index,
          announcementsPageSize: pageSize,
        });
        const guild = res.data as FetchGuildResponse;
        return guild.announcements;
      },
      3
    );

  return (
    <>
      <Title
        title={'Announcement'}
        icon={<AiOutlineNotification color="white" />}
      />
      <div className="h-8" />
      <div>
        {data?.map((page, i) =>
          page.map((announcement) => (
            <div key={announcement.message.id} className="my-2">
              <AnnouncementCard
                announcement={announcement}
                guildId={props.guildId}
              />
            </div>
          ))
        )}
      </div>
      <div className="flex justify-center">
        {isLoadingMore ? (
          <LoadingSpinner />
        ) : (
          !isEnd && (
            <button onClick={() => setSize(size + 1)}>
              <AiFillDownCircle size={30} />
            </button>
          )
        )}
      </div>
    </>
  );
};
