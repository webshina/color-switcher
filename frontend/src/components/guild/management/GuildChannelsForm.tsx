import { ChannelItem } from '#/common/types/Channel';
import { useScreenSize } from '@/hooks/utils/useScreenSize';
import { post } from '@/utils/apiHelper';
import { useToast } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import 'react-datepicker/dist/react-datepicker.css';
import { mutate } from 'swr';
import { GuildChannelForm } from './GuildChannelForm';
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
  channels: ChannelItem[];
};
export const GuildChannelsForm: React.FC<Props> = (props) => {
  const toast = useToast();
  const [channels, setChannels] = useState(props.channels);
  const screenSize = useScreenSize();

  const saveOrder = async (result: DropResult) => {
    // Sort on screen
    const newChannels = Array.from(channels);
    const [recordedItem] = newChannels.splice(result.source.index, 1);
    newChannels.splice(result.destination!.index, 0, recordedItem);
    setChannels(newChannels);
    const orders = newChannels.map((category, index) => {
      return {
        id: category.id,
        order: index,
      };
    });

    try {
      await post(`/api/guild/${props.channels[0].guildId}/channels`, {
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
              className="flex flex-col lg:flex-row overflow-auto"
            >
              {channels.map((channel, index) => (
                <DynamicDraggable
                  key={channel.id}
                  draggableId={channel.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      id={`category-${channel.id}`}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                    >
                      <GuildChannelForm
                        key={channel.id}
                        channel={channel}
                        dragHandleProps={provided.dragHandleProps}
                      />
                    </div>
                  )}
                </DynamicDraggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </DynamicDroppable>
      </DynamicDragDropContext>
    </>
  );
};
