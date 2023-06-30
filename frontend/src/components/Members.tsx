import { GuildMemberItem } from '#/common/types/Guild';
import { UserProfileCard } from './UserProfileCard';

type Props = {
  discordMembers: GuildMemberItem[];
};
export const Members: React.FC<Props> = (props) => {
  return (
    <div className="flex flex-wrap justify-center lg:justify-start">
      {props.discordMembers.map((discordMember) => (
        <div className="m-2" key={discordMember.id}>
          <UserProfileCard discordMember={discordMember} />
        </div>
      ))}
    </div>
  );
};
