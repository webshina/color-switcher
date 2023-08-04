import { GuildMemberItem } from '#/common/types/Guild';
import { FetchGuildResponse } from '#/common/types/apiResponses/GuildControllerResponse';
import { LoadingSpinner } from '@/components/utils/LoadingSpinner';
import { get } from '@/utils/apiHelper';
import React, { useEffect, useRef } from 'react';
import { UserProfileCard } from './UserProfileCard';

type Props = {
  discordMembers: GuildMemberItem[];
};
export const Members: React.FC<Props> = (props) => {
  const loaderRef = useRef(null);

  const [members, setMembers] = React.useState<GuildMemberItem[]>(
    props.discordMembers
  );
  const [hasMore, setHasMore] = React.useState(true);

  const fetchAdditionalMembers = async () => {
    const res = await get('/api/guild/' + props.discordMembers[0].guildId, {
      membersCnt: members.length + 20,
    });
    const guild = res.data as FetchGuildResponse;
    setMembers(guild.members);
    setHasMore(guild.members.length < guild.membersCnt);
  };

  // For infinite scroll
  useEffect(() => {
    var options = {
      root: null, // use the document's viewport as the container
      rootMargin: '0px',
      threshold: 1.0, // trigger when the observer intersect at least 100% of the target
    };

    const observer = new IntersectionObserver(handleObserver, options);

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    function handleObserver(entities: IntersectionObserverEntry[]) {
      const target = entities[0];
      if (target.isIntersecting) {
        // If loader is visible, invoke the fetch function
        fetchAdditionalMembers();
      }
    }

    // Clean up
    return () => {
      observer.disconnect();
    };
  }, [members.length]);

  return (
    <>
      <div className="flex flex-wrap justify-center lg:justify-start">
        {members.map((member) => (
          <div className="m-2" key={member.id}>
            <UserProfileCard member={member} />
          </div>
        ))}
      </div>

      {/* Loader */}
      {hasMore && (
        <div ref={loaderRef} className="flex justify-center">
          <LoadingSpinner />
        </div>
      )}
    </>
  );
};
