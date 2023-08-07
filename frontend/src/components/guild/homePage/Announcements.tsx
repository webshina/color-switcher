import { GuildAnnouncementItem } from '#/common/types/Guild';
import { FetchGuildResponse } from '#/common/types/apiResponses/GuildControllerResponse';
import { LoadingSpinner } from '@/components/utils/LoadingSpinner';
import Title from '@/components/utils/Title';
import { get } from '@/utils/apiHelper';
import React, { useEffect } from 'react';
import { AiFillDownCircle, AiOutlineNotification } from 'react-icons/ai';
import { AnnouncementCard } from './AnnouncementCard';

type Props = {
  guildId: number;
  announcements: GuildAnnouncementItem[];
};
export const Announcements: React.FC<Props> = (props) => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const [announcements, setAnnouncements] = React.useState<
    GuildAnnouncementItem[]
  >(props.announcements);
  const [announcementsCnt, setAnnouncementsCnt] = React.useState<number | null>(
    null
  );

  const fetchAdditionalAnnouncements = async () => {
    setLoading(true);
    const res = await get('/api/guild/' + props.guildId, {
      announcementsCnt: announcements.length + 5,
    });
    const guild = res.data as FetchGuildResponse;
    setAnnouncements(guild.announcements);
    setAnnouncementsCnt(guild.totalAnnouncementsCnt);
    setLoading(false);
  };

  useEffect(() => {
    fetchAdditionalAnnouncements();
  }, []);

  return (
    <>
      <Title
        title={'Announcement'}
        icon={<AiOutlineNotification color="white" />}
      />
      <div className="h-8" />
      <div>
        {announcements.length > 0 &&
          announcements.map((announcement) => {
            return (
              <div key={announcement.message.id} className="my-2">
                <AnnouncementCard
                  announcement={announcement}
                  guildId={props.guildId}
                />
              </div>
            );
          })}
      </div>
      {(!announcementsCnt || announcements.length < announcementsCnt) && (
        <div className="flex justify-center">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <button onClick={fetchAdditionalAnnouncements}>
              <AiFillDownCircle size={30} />
            </button>
          )}
        </div>
      )}
    </>
  );
};
