import { UserItem } from '#/common/types/User';
import { FetchGuildResponse } from '#/common/types/apiResponses/GuildControllerResponse';
import { useRouter } from 'next/router';
import 'react-datepicker/dist/react-datepicker.css';
import { MdPrecisionManufacturing } from 'react-icons/md';
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
        <>
          {/* Update by AI */}
          <div className="flex justify-center">
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
        </>
      )}
    </>
  );
};
