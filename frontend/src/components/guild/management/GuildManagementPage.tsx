import { useGuild } from '@/hooks/repository/useGuild';
import { useMe } from '@/hooks/repository/useMe';
import { useRouter } from 'next/router';
import 'react-datepicker/dist/react-datepicker.css';
import { BiArrowBack } from 'react-icons/bi';
import { GuildChannelCategoryForm } from './GuildChannelCategoryForm';
import { GuildCoverImageForm } from './GuildCoverImageForm';
import { GuildDescriptionForm } from './GuildDescriptionForm';
import { GuildMembersForm } from './GuildMembersForm';
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

          {/* Cover Image */}
          <GuildCoverImageForm guild={guild} />
          <div className="h-20" />

          {/* Description */}
          <GuildDescriptionForm guild={guild} />
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
