import { GuildMemberItem } from '#/common/types/Guild';
import { ToggleAutoGeneration } from '@/components/common/ToggleAutoGeneration';
import { useGuild } from '@/hooks/repository/useGuild';
import Image from 'next/image';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { GuildMemberPostForm } from './GuildMemberPostForm';

type Props = {
  member: GuildMemberItem;
};
export const GuildMemberForm: React.FC<Props> = (props) => {
  const { data: guild } = useGuild({ guildId: props.member.guildId });

  const [generateAuto, setGenerateAuto] = useState(props.member.autoGenerate);

  return (
    <div
      key={props.member.id}
      className="m-1 p-3 w-[200px] bg-gray-700 rounded-xl font-semibold text-gray-300"
    >
      <div className="flex flex-col">
        <div className="relative h-[100px] w-[100px]">
          <Image
            src={props.member.avatarURL ?? '/images/no_image.jpeg'}
            alt="image"
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
          />
        </div>
        <div className="h-2" />

        <div>{props.member.name}</div>
        <div className="h-2" />

        <ToggleAutoGeneration
          guildId={props.member.guildId}
          memberId={props.member.id}
          target="member"
          isChecked={generateAuto}
          onChange={(value) => {
            setGenerateAuto(value);
          }}
        />
        <div className="h-2" />

        {guild?.posts.map((post) => (
          <GuildMemberPostForm
            key={post.id}
            post={post}
            member={props.member}
            disabled={generateAuto}
          />
        ))}
      </div>
    </div>
  );
};
