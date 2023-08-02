import { GuildAnnouncementItem } from '#/common/types/Guild';
import CircleImage from '@/components/utils/CircleImage';
import { TopDisplay } from '@/components/utils/TopDisplay';
import { post } from '@/utils/apiHelper';
import { formatDate } from '@/utils/dateHelper';
import { convertTextToHtml } from '@/utils/htmlHelper';
import { Switch, useToast } from '@chakra-ui/react';
import { mutate } from 'swr';

type Props = {
  guildId: number;
  announcement: GuildAnnouncementItem;
  editable?: boolean;
};
export const AnnouncementCard: React.FC<Props> = ({
  guildId,
  announcement,
  editable = false,
}) => {
  const toast = useToast();

  const toggleHideAsAnnouncement = async (value: boolean) => {
    try {
      await post(`/api/guild/${guildId}/message/${announcement.message.id}`, {
        hideAsAnnouncement: value,
      });
      await mutate('useGuild');
      toast({
        status: 'success',
        description: 'Saved',
      });
    } catch (error) {
      toast({
        status: 'error',
        description: 'Failed',
        isClosable: true,
      });
    }
  };

  if (!editable && announcement.hideAsAnnouncement) return <></>;
  return (
    <TopDisplay>
      <div className="flex p-3 bg-slate-900 rounded-md">
        <div
          className="absolute top-0 left-0 w-full h-full rounded-md"
          style={{
            backgroundColor: announcement.hideAsAnnouncement
              ? 'rgba(0, 0, 0, 0.5)'
              : undefined,
          }}
        />
        <div className="rounded-full w-[50px] h-[50px] m-2">
          <CircleImage
            imgSrc={announcement.author.avatarURL}
            height={50}
            width={50}
          />
        </div>
        <div className="m-1">
          {/* Show Announcement Toggle */}
          {editable && (
            <div className="absolute right-3 flex items-center bg-black/60 px-3 py-1 rounded-full">
              <div>Show</div>
              <div className="w-2" />
              <Switch
                id="toggle-auto-generation"
                size="md"
                colorScheme="pink"
                isChecked={!announcement.hideAsAnnouncement}
                onChange={(e) => {
                  toggleHideAsAnnouncement(!e.target.checked);
                }}
              />
            </div>
          )}
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
          <div>{convertTextToHtml(announcement.message.content)}</div>
        </div>
      </div>
    </TopDisplay>
  );
};
