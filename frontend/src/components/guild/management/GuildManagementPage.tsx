import Title from '@/components/utils/Title';
import { useGuild } from '@/hooks/repository/useGuild';
import { useMe } from '@/hooks/repository/useMe';
import 'react-datepicker/dist/react-datepicker.css';
import { BsFillPeopleFill } from 'react-icons/bs';
import { IoChatbubblesSharp } from 'react-icons/io5';
import { MdManageAccounts } from 'react-icons/md';
import { GuildCoverImageForm } from './GuildCoverImageForm';
import { GuildDescriptionForm } from './GuildDescriptionForm';
import { GuildTagForm } from './GuildTagForm';

type Props = {
  guildId: number;
};
export const GuildManagementPage: React.FC<Props> = (props) => {
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
          {/* Cover Image */}
          <GuildCoverImageForm guild={guild} />
          <div className="h-20" />

          {/* Description */}
          <GuildDescriptionForm guild={guild} />
          <div className="h-8" />

          {/* Tags */}
          <GuildTagForm guild={guild} />
          <div className="h-8" />

          {/* Management Team */}
          <Title
            title={'Management Team'}
            icon={<MdManageAccounts color="white" />}
          />
          <div className="h-8" />
          <div className="h-16" />

          {/* Channel list */}
          {guild.channels && guild.channels.length > 0 && (
            <>
              <Title
                title={'Channels'}
                icon={<IoChatbubblesSharp color="white" />}
              />
              <div className="h-8" />
              <div className="h-16" />
            </>
          )}

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
