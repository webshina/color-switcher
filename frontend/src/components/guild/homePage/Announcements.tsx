import { GuildItem } from '#/common/types/Guild';
import Title from '@/components/utils/Title';
import { AiOutlineNotification } from 'react-icons/ai';
import { AnnouncementCard } from './AnnouncementCard';

type Props = {
  guild: GuildItem;
};
export const Announcements: React.FC<Props> = (props) => {
  return (
    <div>
      <Title
        title={'Announcement'}
        icon={<AiOutlineNotification color="white" />}
      />
      <div className="h-8" />
      <div>
        {props.guild.announcements.length > 0 &&
          props.guild.announcements.map((announcement) => {
            return (
              <div key={announcement.messageId} className="my-2">
                <AnnouncementCard announcement={announcement} />
              </div>
            );
          })}
      </div>
    </div>
  );
};
