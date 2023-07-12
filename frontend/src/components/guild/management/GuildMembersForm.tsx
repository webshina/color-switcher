import { GuildMemberItem } from '#/common/types/Guild';
import Title from '@/components/utils/Title';
import { useScreenSize } from '@/hooks/utils/useScreenSize';
import { post } from '@/utils/apiHelper';
import { useToast } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import 'react-datepicker/dist/react-datepicker.css';
import { mutate } from 'swr';
import { GuildMemberForm } from './GuildMemberForm';
const DynamicDroppable = dynamic(
  () => import('react-beautiful-dnd').then((mod) => mod.Droppable),
  { ssr: false }
);
const DynamicDraggable = dynamic(
  () => import('react-beautiful-dnd').then((mod) => mod.Draggable),
  { ssr: false }
);
const DynamicDragDropContext = dynamic(
  () => import('react-beautiful-dnd').then((mod) => mod.DragDropContext),
  { ssr: false }
);

type Props = {
  members: GuildMemberItem[];
};
export const GuildMembersForm: React.FC<Props> = (props) => {
  const toast = useToast();
  const screenSize = useScreenSize();
  const [members, setMembers] = useState(props.members);

  const saveOrder = async (result: DropResult) => {
    // Sort on screen
    const newMembers = Array.from(members);
    const [recordedItem] = newMembers.splice(result.source.index, 1);
    newMembers.splice(result.destination!.index, 0, recordedItem);
    setMembers(newMembers);
    const orders = newMembers.map((member, index) => {
      return {
        id: member.id,
        order: index,
      };
    });

    try {
      await post(`/api/guild/${props.members[0].guildId}/members`, {
        orders,
      });
      await mutate('useGuild');
      toast({
        status: 'success',
        description: 'Saved',
      });
    } catch (error) {
      toast({
        status: 'error',
        description: 'Failed',
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Title title="Members" />
      <div className="h-5" />
      <DynamicDragDropContext
        onDragEnd={(result) => {
          saveOrder(result);
        }}
      >
        <DynamicDroppable
          droppableId="category"
          direction={screenSize === 'lg' ? 'horizontal' : 'vertical'}
        >
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-col lg:flex-row"
            >
              {members.map((member, index) => (
                <DynamicDraggable
                  key={member.id}
                  draggableId={member.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      className="m-1"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <GuildMemberForm
                        key={member.id}
                        member={member}
                        dragHandleProps={provided.dragHandleProps}
                      />
                    </div>
                  )}
                </DynamicDraggable>
              ))}
            </div>
          )}
        </DynamicDroppable>
      </DynamicDragDropContext>
    </>
  );
};
