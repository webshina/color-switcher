import { GuildMemberItem } from '#/common/types/Guild';
import Title from '@/components/utils/Title';
import { useToast } from '@chakra-ui/react';
import 'react-datepicker/dist/react-datepicker.css';
import { GuildMemberForm } from './GuildMemberForm';

type Props = {
  members: GuildMemberItem[];
};
export const GuildMembersForm: React.FC<Props> = (props) => {
  console.log(props.members);
  const toast = useToast();

  return (
    <>
      <Title title="Members" />
      <div className="h-5" />
      {props.members.map((member) => (
        <GuildMemberForm key={member.id} member={member} />
      ))}
    </>
  );
};
