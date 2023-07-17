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
          {/* Home Page */}
          {props.page === 'home' && <GuildHomePage guild={guild} user={user} />}

          {/* Management Page */}
          {props.page === 'management' && (
            <GuildManagementPage guild={guild} user={user} />
          )}

          {/* Page Switch */}
          {isOwner && (
            // Fix to bottom of screen
            <div className="fixed bottom-0 left-0 right-0 flex justify-center bg-gray-800/50 z-10">
              <GuildHomePageSwitch
                currentPage={props.page}
                guildId={props.guildId}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};
