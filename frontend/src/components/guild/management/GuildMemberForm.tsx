import { GuildMemberItem } from '#/common/types/Guild';
import Image from 'next/image';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

type Props = {
  member: GuildMemberItem;
  onChange: () => void;
};
export const GuildMemberForm: React.FC<Props> = (props) => {
  const [generateAuto, setGenerateAuto] = useState(props.member.autoGenerate);

  return (
    <div key={props.member.id} className="flex flex-col w-[250px]">
      <div className="flex justify-center items-center p-2 bg-slate-600 rounded-t-xl">
        <div className="flex-1 text-center">{props.member.name}</div>
      </div>

      <div className="flex flex-col p-3 bg-gray-700 rounded-b-xl font-semibold text-gray-300">
        <div className="flex justify-center">
          <div className="relative h-[100px] w-[100px]">
            <Image
              src={props.member.avatarURL ?? '/images/no_image.jpeg'}
              alt="image"
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
