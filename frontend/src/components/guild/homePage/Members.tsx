import { InfiniteLoader } from '@/components/utils/InfiniteLoader';
import { LoadingSpinner } from '@/components/utils/LoadingSpinner';
import { useMembers } from '@/hooks/repository/useMembers';
import React from 'react';
import { UserProfileCard } from './UserProfileCard';

type Props = {
  guildId: number;
};
export const Members: React.FC<Props> = (props) => {
  const { membersPages, isLoadingMore, isEnd, size, setSize } = useMembers({
    guildId: props.guildId,
  });

  return (
    <>
      <div className="flex flex-wrap justify-center lg:justify-start">
        {membersPages?.map((page, i) =>
          page.map((member) => (
            <div className="m-2" key={member.id}>
              <UserProfileCard member={member} />
            </div>
          ))
        )}
      </div>

      <div className="flex justify-center">
        {isLoadingMore ? (
          <LoadingSpinner />
        ) : (
          !isEnd && (
            <InfiniteLoader
              loadMore={() => setSize(size + 1)}
              isEnd={isEnd ?? false}
            />
          )
        )}
      </div>
    </>
  );
};
