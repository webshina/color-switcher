import { GuildMemberItem } from '#/common/types/Guild';
import { ToggleAutoGeneration } from '@/components/common/ToggleAutoGeneration';
import Image from 'next/image';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

type Props = {
  managementMember: GuildMemberItem;
  onChange: () => void;
};
export const GuildManagementMemberForm: React.FC<Props> = (props) => {
  const [generateAuto, setGenerateAuto] = useState(props.member.autoGenerate);

  return (
    <></>
  );
};
