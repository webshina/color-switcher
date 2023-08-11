import { useManagementMembers } from '@/hooks/repository/useManagementMembers';
import { UserProfileCard } from './UserProfileCard';

type Props = {
  guildId: number;
};
export const ManagementMembers: React.FC<Props> = (props) => {
  const { data: members } = useManagementMembers({
    guildId: props.guildId,
  });

  return (
    <div className="flex flex-wrap justify-center lg:justify-start">
      {members?.map((member) => (
        <div className="m-2" key={member.id}>
          <UserProfileCard member={member} />
        </div>
      ))}
    </div>
  );
};
