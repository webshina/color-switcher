import { useGuild } from '@/hooks/repository/useGuild';
import { useMe } from '@/hooks/repository/useMe';
import { useRouter } from 'next/router';
import 'react-datepicker/dist/react-datepicker.css';
import { GuildHomePageSwitch, Page } from './GuildHomePageSwitch';
import { GuildHomePage } from './homePage/GuildHomePage';
import { GuildManagementPage } from './management/GuildManagementPage';

type Props = {
  page: Page;
  guildId: number;
};
export const GuildTop: React.FC<Props> = (props) => {
  const router = useRouter();
  const { data: guild } = useGuild({ guildId: props.guildId });
  const { data: user } = useMe();
  const isOwner = guild?.managementMembers.some(
    (member) => member.discordId === user?.discordId
  );

  return (
    <>
      {guild && (
        <>
          {/* Page Switch */}
          {isOwner && (
            <>
              <div className="flex justify-center">
                <GuildHomePageSwitch
                  currentPage={props.page}
                  guildId={props.guildId}
                />
              </div>
              <div className="h-16" />
            </>
          )}

          {/* Home Page */}
          {props.page === 'home' && <GuildHomePage guild={guild} user={user} />}

          {/* Management Page */}
          {props.page === 'management' && (
            <GuildManagementPage guild={guild} user={user} />
          )}
        </>
      )}
    </>
  );
};
