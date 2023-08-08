import React from 'react';
import { AiFillDownCircle, AiOutlineNotification } from 'react-icons/ai';

import { LoadingSpinner } from '@/components/utils/LoadingSpinner';
import Title from '@/components/utils/Title';
import { useAnnouncements } from '@/hooks/repository/useAnnouncements';
import { AnnouncementCard } from './AnnouncementCard';

type Props = {
  guildId: number;
};

export const Announcements: React.FC<Props> = (props) => {
  const { announcementsPages, isLoadingMore, isEnd, size, setSize } =
    useAnnouncements({
      guildId: props.guildId,
    });

  return (
    <>
      <Title
        title={'Announcement'}
        icon={<AiOutlineNotification color="white" />}
      />
      <div className="h-8" />
      <div>
        {announcementsPages?.map((page, i) =>
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
