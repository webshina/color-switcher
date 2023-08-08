import { GuildAnnouncementItem } from '#/common/types/Guild';
import { LoadingSpinner } from '@/components/utils/LoadingSpinner';
import Title from '@/components/utils/Title';
import { useAnnouncements } from '@/hooks/repository/useAnnouncements';
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { AiFillDownCircle } from 'react-icons/ai';
import { AnnouncementCard } from '../homePage/AnnouncementCard';

type Props = {
  guildId: number;
  announcements: GuildAnnouncementItem[];
};
export const GuildAnnouncementsForm: React.FC<Props> = (props) => {
  const { announcementsPages, isLoadingMore, isEnd, size, setSize, mutate } =
    useAnnouncements({
      guildId: props.guildId,
    });

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
                onChange={() => {
                  mutate();
                }}
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
