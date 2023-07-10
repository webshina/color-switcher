import { useGuild } from '@/hooks/repository/useGuild';
import { useMe } from '@/hooks/repository/useMe';
import { useRouter } from 'next/router';
import 'react-datepicker/dist/react-datepicker.css';
import { BiArrowBack } from 'react-icons/bi';
import { MdPrecisionManufacturing } from 'react-icons/md';
import { GuildChannelCategoryForm } from './GuildChannelCategoryForm';
import { GuildCoverImageForm } from './GuildCoverImageForm';
import { GuildDescriptionForm } from './GuildDescriptionForm';
import { GuildMembersForm } from './GuildMembersForm';
import { GuildShareMessageForm } from './GuildShareMessageForm';
import { GuildTagForm } from './GuildTagForm';

type Props = {
  guildId: number;
};
export const GuildManagementPage: React.FC<Props> = (props) => {
  const router = useRouter();
  const { data: guild } = useGuild({ guildId: props.guildId });
  const { data: user } = useMe();
  const isOwner = guild?.managementMembers.some(
    (member) => member.discordId === user?.discordId
  );
  if (!isOwner) {
    return <></>;
  }

  return (
    <>
      {guild && (
        <>
          {/* Back button */}
          <div className="flex justify-start">
            <button
              className="flex items-center px-4 py-2 text-lg bg-slate-800 rounded-xl border-2 border-slate-700"
              onClick={() => {
                router.push(`/guild/${guild.id}`);
              }}
            >
              <BiArrowBack />
              <div className="w-1" />
              Back
            </button>
          </div>
          <div className="h-20" />

          {/* Update by AI */}
          <div className="flex justify-center">
            <button
              className="flex justify-center items-center px-8 py-4 gradient-bg-purple-to-pink rounded-xl border border-gray-600 font-bold text-lg"
              onClick={() => {
                router.push(`/guild/create?guildDiscordId=${guild.discordId}`);
              }}
            >
              <MdPrecisionManufacturing size={30} />
              <div className="w-2" />
              Update by AI
            </button>
          </div>
          <div className="h-16" />

          {/* Cover Image */}
          <GuildCoverImageForm guild={guild} />
          <div className="h-20" />

          {/* Description */}
          <GuildDescriptionForm guild={guild} />
          <div className="h-16" />

          {/* Share Message */}
          <GuildShareMessageForm guild={guild} />
          <div className="h-16" />

          {/* Tags */}
          <GuildTagForm guild={guild} />
          <div className="h-16" />

          {/* Channel list */}
          <GuildChannelCategoryForm guild={guild} />
          <div className="h-16" />

          {/* Member list */}
          <GuildMembersForm
            members={[...guild.managementMembers, ...guild.members]}
          />

          <div className="h-16" />
        </>
      )}
    </>
  );
};
