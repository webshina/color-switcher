import { GuildMemberItem } from '#/common/types/Guild';
import { UserProfileCard } from './UserProfileCard';

type Props = {
  members: GuildMemberItem[];
};
export const ManagementMembers: React.FC<Props> = (props) => {
  return (
    <div className="flex flex-wrap justify-center lg:justify-start">
      {props.members.map((member) => (
        <div className="m-2" key={member.id}>
          <UserProfileCard member={member} />
        </div>
      ))}
    </div>
  );
};
