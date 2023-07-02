import { GuildItem } from '#/common/types/Guild';
import Title from '@/components/utils/Title';
import { post } from '@/utils/apiHelper';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  useToast,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import 'react-datepicker/dist/react-datepicker.css';
import { MdDragHandle } from 'react-icons/md';
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
  guild: GuildItem;
};
export const GuildChannelCategoryForm: React.FC<Props> = (props) => {
  const toast = useToast();
  // const [generateAuto, setGenerateAuto] = useState(props.guild.autoGenerate);
  const [categories, setCategories] = useState(props.guild.categories);

  const save = async (result: DropResult) => {
    // Sort on screen
    const newCategories = Array.from(categories);
    const [recordedItem] = newCategories.splice(result.source.index, 1);
    newCategories.splice(result.destination!.index, 0, recordedItem);
    setCategories(newCategories);
    const categoryOrders = newCategories.map((category, index) => {
      return {
        id: category.id,
        name: category.name,
        order: index,
      };
    });

    try {
      await post(`/api/guild/${props.guild.id}/channel/category`, {
        categoryOrders,
      });
      console.log('useGuild');
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
      <Title title="Channels" />
      <div className="h-8" />
      <DragDropContext
        onDragEnd={(result) => {
          save(result);
        }}
      >
        <DynamicDroppable droppableId="category">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <Accordion
                defaultIndex={[]} // Close all accordions
                allowMultiple
              >
                {categories.map((category, index) => (
                  <DynamicDraggable
                    key={category.id}
                    draggableId={category.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        id={`category-${category.id}`}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                      >
                        <AccordionItem key={category.id}>
                          <h2>
                            <AccordionButton className="bg-slate-800">
                              <Box as="span" flex="1" textAlign="left">
                                <div className="flex items-center">
                                  <div
                                    id="drag-handle"
                                    {...provided.dragHandleProps}
                                  >
                                    <MdDragHandle size={20} />
                                  </div>
                                  <div className="w-2" />
                                  <div className="text-2xl font-bold">
                                    {category.name}
                                  </div>
                                </div>
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                          </h2>
                          <AccordionPanel p={0} pb={4}>
                            <div className="h-1" />
                            <div className="flex flex-wrap">
                              {category.channels.map((channel) => (
                                <GuildChannelForm
                                  key={channel.id}
                                  channel={channel}
                                />
                              ))}
                            </div>
                          </AccordionPanel>
                          <div className="h-8" />
                        </AccordionItem>
                      </div>
                    )}
                  </DynamicDraggable>
                ))}
              </Accordion>
              {provided.placeholder}
            </div>
          )}
        </DynamicDroppable>
      </DragDropContext>
    </>
  );
};
