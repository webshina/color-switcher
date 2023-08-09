import { InfiniteLoader } from '@/components/utils/InfiniteLoader';
import { LoadingSpinner } from '@/components/utils/LoadingSpinner';
import { useMembersInfiniteLoad } from '@/hooks/repository/useMembersInfiniteLoad';
import 'react-datepicker/dist/react-datepicker.css';
import { GuildMemberForm } from './GuildMemberForm';

type Props = {
  guildId: number;
};
export const GuildMembersForm: React.FC<Props> = (props) => {
  const { membersPages, isLoadingMore, isEnd, size, setSize, mutate } =
    useMembersInfiniteLoad({
      guildId: props.guildId,
    });

  return (
    <>
      <div className="flex flex-wrap justify-center lg:justify-start">
        {membersPages?.map((page, i) =>
          page.map((member) => (
            <div className="m-2" key={member.id}>
              <GuildMemberForm
                key={member.id}
                member={member}
                onChange={() => {
                  mutate();
                }}
              />
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
