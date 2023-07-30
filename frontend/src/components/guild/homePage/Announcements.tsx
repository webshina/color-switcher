import { GuildItem } from '#/common/types/Guild';
import CircleImage from '@/components/utils/CircleImage';
import Title from '@/components/utils/Title';
import { TopDisplay } from '@/components/utils/TopDisplay';
import { formatDate } from '@/utils/dateHelper';
import { convertTextToHtml } from '@/utils/htmlHelper';
import { AiOutlineNotification } from 'react-icons/ai';

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
                <TopDisplay>
                  <div className="flex p-3 bg-slate-900 rounded-md">
                    <div className="rounded-full w-[50px] h-[50px] m-2">
                      <CircleImage
                        imgSrc={announcement.author.avatarURL}
                        height={50}
                        width={50}
                      />
                    </div>
                    <div className="m-1">
                      <div className="flex items-end">
                        <div className="font-bold">
                          {announcement.author.displayName.toUpperCase()}
                        </div>
                        <div className="w-2" />
                        <div className="text-xs">
                          {formatDate(announcement.postedAt, 'yyyy/M/d H:m')}
                        </div>
                      </div>
                      <div className="h-1" />
                      <div>{convertTextToHtml(announcement.message)}</div>
                    </div>
                  </div>
                </TopDisplay>
              </div>
            );
          })}
      </div>
    </div>
  );
};
