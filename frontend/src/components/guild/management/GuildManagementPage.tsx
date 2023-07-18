import { UserItem } from '#/common/types/User';
import { FetchGuildResponse } from '#/common/types/apiResponses/GuildControllerResponse';
import { formatDate } from '@/utils/dateHelper';
import { useRouter } from 'next/router';
import 'react-datepicker/dist/react-datepicker.css';
import { MdPrecisionManufacturing } from 'react-icons/md';
import { AnnouncementsToManager } from '../announcements/AnnouncementsToManager';
import { GuildChannelCategoryForm } from './GuildChannelCategoryForm';
import { GuildCoverImageForm } from './GuildCoverImageForm';
import { GuildDescriptionForm } from './GuildDescriptionForm';
import { GuildMembersForm } from './GuildMembersForm';
import { GuildShareMessageForm } from './GuildShareMessageForm';
import { GuildTagForm } from './GuildTagForm';

type Props = {
  guild: FetchGuildResponse;
  user?: UserItem | null;
};
export const GuildManagementPage: React.FC<Props> = (props) => {
  const router = useRouter();
  const isOwner = props.guild?.managementMembers.some(
    (member) => member.discordId === props.user?.discordId
  );
  if (!isOwner) {
    return <></>;
  }

  return (
    <>
      {props.guild && (
        <div className="lg:mx-24">
          {/* Announcements */}
          <AnnouncementsToManager guild={props.guild} user={props.user} />

          {/* Update by AI */}
          <div className="flex flex-col justify-center items-center py-12 bg-slate-900 rounded-xl">
            <button
              className="flex justify-center items-center px-8 py-4 gradient-bg-purple-to-pink rounded-xl border border-gray-600 font-bold text-lg"
              onClick={() => {
                router.push(
                  `/guild/create?guildDiscordId=${props.guild.discordId}`
                );
              }}
            >
              <MdPrecisionManufacturing size={30} />
              <div className="w-2" />
              Update by AI
            </button>
            <div className="h-3" />
            {props.guild.lastSyncedAt && (
              <>
                <div className="my-2 text-sm">
                  Last Synced At :{' '}
                  <span className="font-bold">
                    {formatDate(props.guild.lastSyncedAt, 'yyyy/M/d H:m')}
                  </span>
                </div>
                <div className="h-2" />
              </>
            )}
            <div className="text-sm">
              ※ Automatically updated at 18:00 (UTC)
            </div>
          </div>
          <div className="h-16" />

          {/* Cover Image */}
          <GuildCoverImageForm guild={props.guild} />
          <div className="h-20" />

          {/* Description */}
          <GuildDescriptionForm guild={props.guild} />
          <div className="h-16" />

          {/* Share Message */}
          <GuildShareMessageForm guild={props.guild} />
          <div className="h-16" />

          {/* Tags */}
          <GuildTagForm guild={props.guild} />
          <div className="h-16" />

          {/* Channel list */}
          <GuildChannelCategoryForm guild={props.guild} />
          <div className="h-16" />

          {/* Member list */}
          <GuildMembersForm
            members={[...props.guild.managementMembers, ...props.guild.members]}
          />

          <div className="h-16" />
        </div>
      )}
    </>
  );
};
