import { GuildAnnouncementItem } from '#/common/types/Guild';
import { FetchGuildResponse } from '#/common/types/apiResponses/GuildControllerResponse';
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

  return (
    <>
      <Title title="Announcements" />
      <div className="h-5" />
      {announcements.map((announcement, index) => (
        <div key={index} className="m-2">
          <AnnouncementCard
            guildId={props.guildId}
            announcement={announcement}
            editable
          />
        </div>
      ))}
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
