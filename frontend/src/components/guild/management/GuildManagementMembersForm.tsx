import { GuildMemberItem } from '#/common/types/Guild';
import { ToggleAutoGeneration } from '@/components/common/ToggleAutoGeneration';
import Title from '@/components/utils/Title';
import { useManagementMembers } from '@/hooks/repository/useManagementMembers';
import { useMembers } from '@/hooks/repository/useMembers';
import useInputField from '@/hooks/utils/useInputField';
import { useScreenSize } from '@/hooks/utils/useScreenSize';
import { post } from '@/utils/apiHelper';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import 'react-datepicker/dist/react-datepicker.css';
import { FaPlus } from 'react-icons/fa';
import { mutate } from 'swr';
import { GuildManagementMemberForm } from './GuildManagementMemberForm';
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
  guildId: number;
  autoGenerate: boolean;
};
export const GuildManagementMembersForm: React.FC<Props> = (props) => {
  const toast = useToast();

  const screenSize = useScreenSize();

  const { data: managementMembersData } = useManagementMembers({
    guildId: props.guildId,
  });
  const { data: membersData } = useMembers({
    guildId: props.guildId,
  });

  const [managementMembers, setManagementMembers] = useState<GuildMemberItem[]>(
    []
  );
  useEffect(() => {
    setManagementMembers(managementMembersData ?? []);
  }, [JSON.stringify(managementMembersData)]);

  // Auto Generation
  const [generateAuto, setGenerateAuto] = useState<boolean>(props.autoGenerate);

  const saveOrder = async (result: DropResult) => {
    if (!managementMembersData) return;

    // Sort on screen
    const newMembers = Array.from(managementMembersData);
    const [recordedItem] = newMembers.splice(result.source.index, 1);
    newMembers.splice(result.destination!.index, 0, recordedItem);
    setManagementMembers(newMembers);
    const orders = newMembers.map((member, index) => {
      return {
        id: member.id,
        order: index,
      };
    });

    try {
      await post(`/api/guild/${props.guildId}/members`, {
        orders,
      });
      await mutate('useManagementMembers');
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

  const {
    isOpen: isOpenAddModal,
    onOpen: onOpenAddModal,
    onClose: onCloseAddModal,
  } = useDisclosure();

  const { inputField: addingMemberInputField, valueState: addingMemberId } =
    useInputField({
      id: 'add-member-id',
      type: 'select',
      options:
        membersData?.map((member) => ({
          label: member.name as string,
          value: member.id,
        })) ?? [],
    });

  const addManagementMember = async () => {
    try {
      await post(
        `/api/guild/${props.guildId}/member/${addingMemberId}/management-member/add`
      );
      await mutate('useManagementMembers');
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
      {/* Add Modal */}
      <Modal
        closeOnOverlayClick={true}
        isOpen={isOpenAddModal}
        onClose={onCloseAddModal}
        isCentered
      >
        <ModalOverlay />
        <ModalContent bgColor="#222">
          <ModalCloseButton />
          <ModalBody>
            <div className="flex flex-col justify-center items-center p-8">
              Select the members you want to add to the manager.
              <div className="h-5" />
              {addingMemberInputField}
              <div className="h-8" />
              <div className="w-full text-right">
                <Button
                  colorScheme="pink"
                  onClick={async () => {
                    await addManagementMember();
                    onCloseAddModal();
                  }}
                >
                  Add
                </Button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Title title="Management Members" />
      <div className="h-5" />
      <div className="flex justify-end">
        <ToggleAutoGeneration
          guildId={props.guildId}
          target="managementMembers"
          isChecked={generateAuto}
          onChange={(value) => {
            setGenerateAuto(value);
          }}
        />
      </div>
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
              className="flex flex-col lg:flex-row justify-start items-center"
            >
              {managementMembers.map((member, index) => (
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
                      <GuildManagementMemberForm
                        key={member.id}
                        member={member}
                        editable={!generateAuto}
                        dragHandleProps={provided.dragHandleProps}
                      />
                    </div>
                  )}
                </DynamicDraggable>
              ))}

              {/* Add Button */}
              {!generateAuto && (
                <button
                  className="flex justify-center items-center m-5 w-[50px] h-[50px] bg-slate-600 rounded-full"
                  onClick={onOpenAddModal}
                >
                  <FaPlus size={30} />
                </button>
              )}
            </div>
          )}
        </DynamicDroppable>
      </DynamicDragDropContext>
    </>
  );
};
