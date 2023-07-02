import Title from '@/components/utils/Title';
import { useGuild } from '@/hooks/repository/useGuild';
import { useMe } from '@/hooks/repository/useMe';
import { useRouter } from 'next/router';
import 'react-datepicker/dist/react-datepicker.css';
import { BiArrowBack } from 'react-icons/bi';
import { BsFillPeopleFill } from 'react-icons/bs';
import { GuildChannelCategoryForm } from './GuildChannelCategoryForm';
import { GuildCoverImageForm } from './GuildCoverImageForm';
import { GuildDescriptionForm } from './GuildDescriptionForm';
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
          {/* {guild.channels && guild.channels.length > 0 && (
            <>
              <Title
                title={'Channels'}
                icon={<IoChatbubblesSharp color="white" />}
              />
              <div className="h-8" />
              <div className="flex flex-wrap">
                {guild.channels.map((channel) => (
                  <GuildChannelForm channel={channel} key={channel.id} />
                ))}
              </div>
              <div className="h-16" />
            </>
          )} */}

          {/* Member list */}
          {guild.members && guild.members.length > 0 && (
            <>
              <Title
                title={'Members'}
                icon={<BsFillPeopleFill color="white" />}
              />
              <div className="h-8" />
              <div className="h-8" />
            </>
          )}

          <div className="h-16" />
        </>
      )}
    </>
  );
};
