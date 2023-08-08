import { GuildAnnouncementItem } from '#/common/types/Guild';
import { FetchGuildResponse } from '#/common/types/apiResponses/GuildControllerResponse';
import { useInfiniteLoad } from '@/components/hooks/utils/useInfiniteLoad';
import { LoadingSpinner } from '@/components/utils/LoadingSpinner';
import Title from '@/components/utils/Title';
import { get } from '@/utils/apiHelper';
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { AiFillDownCircle } from 'react-icons/ai';
import { AnnouncementCard } from '../homePage/AnnouncementCard';

type Props = {
  guildId: number;
  announcements: GuildAnnouncementItem[];
};
export const GuildAnnouncementsForm: React.FC<Props> = (props) => {
  const {
    data: announcementsPages,
    isLoadingMore,
    isEnd,
    size,
    setSize,
  } = useInfiniteLoad<GuildAnnouncementItem>(
    `/api/guild/${props.guildId}`,
    async (url, index, pageSize) => {
      const res = await get(url, {
        announcementsPageIdx: index,
        announcementsPageSize: pageSize,
      });
      const guild = res.data as FetchGuildResponse;
      return guild.announcements;
    },
    1
  );

  return (
    <>
      <Title title="Announcements" />
      <div className="h-5" />
      <div>
        {announcementsPages?.map((page, i) =>
          page.map((announcement) => (
            <div key={announcement.message.id} className="my-2">
              <AnnouncementCard
                announcement={announcement}
                guildId={props.guildId}
                editable
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
