import { GuildMemberItem } from '#/common/types/Guild';
import Image from 'next/image';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import 'react-datepicker/dist/react-datepicker.css';
import { MdDragIndicator } from 'react-icons/md';

type Props = {
  member: GuildMemberItem;
  editable?: boolean;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};
export const GuildManagementMemberForm: React.FC<Props> = (props) => {
  return (
    <div key={props.member.id} className="flex flex-col w-[200px]">
      <div
        className="flex justify-center items-center p-2 bg-slate-600 rounded-t-xl"
        style={{
          cursor: props.editable ? 'grab' : 'default',
        }}
        {...props.dragHandleProps}
      >
        {props.editable && <MdDragIndicator size={20} />}
        <div className="flex-1 text-center">{props.member.name}</div>
      </div>

      <div className="flex flex-col p-3 bg-gray-700 rounded-b-xl font-semibold text-gray-300">
        <div className="flex justify-center">
          <div className="relative h-[100px] w-[100px]">
            <Image
              src={
                props.member.avatarURL ?? '/images/snsIcons/Discord_dark.svg'
              }
              alt="image"
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
            />
          </div>
        </div>
        <div className="h-4" />
      </div>
    </div>
  );
};
