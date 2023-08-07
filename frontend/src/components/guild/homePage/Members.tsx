import { GuildMemberItem } from '#/common/types/Guild';
import { FetchGuildResponse } from '#/common/types/apiResponses/GuildControllerResponse';
import { InfiniteLoader } from '@/components/utils/InfiniteLoader';
import { get } from '@/utils/apiHelper';
import React from 'react';
import { UserProfileCard } from './UserProfileCard';

type Props = {
  discordMembers: GuildMemberItem[];
};
export const Members: React.FC<Props> = (props) => {
  const [members, setMembers] = React.useState<GuildMemberItem[]>(
    props.discordMembers
  );
  const [membersCnt, setMembersCnt] = React.useState<number | null>(null);

  const fetchAdditionalMembers = async () => {
    const res = await get('/api/guild/' + props.discordMembers[0].guildId, {
      membersCnt: members.length + 20,
    });
    const guild = res.data as FetchGuildResponse;
    setMembers(guild.members);
    setMembersCnt(guild.totalMembersCnt);
  };

  return (
    <>
      <div className="flex flex-wrap justify-center lg:justify-start">
        {members.map((member) => (
          <div className="m-2" key={member.id}>
            <UserProfileCard member={member} />
          </div>
        ))}
      </div>
      <InfiniteLoader
        loadMore={fetchAdditionalMembers}
        items={members}
        itemMaxCnt={membersCnt}
      />
    </>
  );
};
