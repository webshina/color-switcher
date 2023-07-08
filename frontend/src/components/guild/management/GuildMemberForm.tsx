import { GuildMemberItem } from '#/common/types/Guild';
import { ToggleAutoGeneration } from '@/components/common/ToggleAutoGeneration';
import { useGuild } from '@/hooks/repository/useGuild';
import Image from 'next/image';
import { useState } from 'react';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import 'react-datepicker/dist/react-datepicker.css';
import { MdDragIndicator } from 'react-icons/md';
import { GuildMemberPostForm } from './GuildMemberPostForm';

type Props = {
  member: GuildMemberItem;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};
export const GuildMemberForm: React.FC<Props> = (props) => {
  const { data: guild } = useGuild({ guildId: props.member.guildId });

  const [generateAuto, setGenerateAuto] = useState(props.member.autoGenerate);

  return (
    <div key={props.member.id} className="flex flex-col w-[250px]">
      <div
        className="flex justify-center items-center p-2 bg-slate-600 rounded-t-xl"
        {...props.dragHandleProps}
      >
        <MdDragIndicator size={20} />
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
        <div className="h-4" />

        <div className="flex justify-between">
          <div className="text-sm">Post</div>
          <ToggleAutoGeneration
            guildId={props.member.guildId}
            memberId={props.member.id}
            target="member"
            isChecked={generateAuto}
            onChange={(value) => {
              setGenerateAuto(value);
            }}
          />
        </div>
        <div className="h-1" />
        <div className="p-2 border-[1px] border-gray-500 rounded">
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
    </div>
  );
};
