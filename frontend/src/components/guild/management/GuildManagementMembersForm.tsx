import { ToggleAutoGeneration } from '@/components/common/ToggleAutoGeneration';
import Title from '@/components/utils/Title';
import { useManagementMembers } from '@/hooks/repository/useManagementMembers';
import { useMembers } from '@/hooks/repository/useMembers';
import useInputField from '@/hooks/utils/useInputField';
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
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { AiFillDelete } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa';
import { mutate } from 'swr';
import { UserProfileCard } from '../homePage/UserProfileCard';

type Props = {
  guildId: number;
};
export const GuildManagementMemberForm: React.FC<Props> = (props) => {
  const toast = useToast();

  const { data: managementMembers } = useManagementMembers({
    guildId: props.guildId,
  });
  const { data: members } = useMembers({
    guildId: props.guildId,
  });
  const [generateAuto, setGenerateAuto] = useState<boolean>(false);

  const {
    isOpen: isOpenAddModal,
    onOpen: onOpenAddModal,
    onClose: onCloseAddModal,
  } = useDisclosure();
  const {
    isOpen: isOpenDeleteModal,
    onOpen: onOpenDeleteModal,
    onClose: onCloseDeleteModal,
  } = useDisclosure();

  const { inputField: addingMemberInputField, valueState: addingMemberId } =
    useInputField({
      id: 'add-member-id',
      type: 'select',
      options:
        members?.map((member) => ({
          label: member.name as string,
          value: member.id,
        })) ?? [],
    });
  const [deleteMemberId, setDeleteMemberId] = useState<number>();

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

  const deleteManagementMember = async () => {
    try {
      await post(
        `/api/guild/${props.guildId}/member/${deleteMemberId}/management-member/delete`
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

      {/* Delete Modal */}
      <Modal
        closeOnOverlayClick={true}
        isOpen={isOpenDeleteModal}
        onClose={onCloseDeleteModal}
        isCentered
      >
        <ModalOverlay />
        <ModalContent bgColor="#222">
          <ModalCloseButton />
          <ModalBody>
            <div className="flex flex-col justify-center items-center p-8">
              Are you sure you want to delete this member from the manager?
              <div className="h-5" />
              <div className="w-full text-right">
                <Button
                  colorScheme="pink"
                  onClick={async () => {
                    await deleteManagementMember();
                    onCloseDeleteModal();
                  }}
                >
                  Delete
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
          target="description"
          isChecked={generateAuto}
          onChange={(value) => {
            setGenerateAuto(value);
          }}
        />
      </div>
      <div className="h-5" />
      <div className="flex flex-wrap justify-center lg:justify-start items-center">
        {managementMembers?.map((member) => (
          <div className="relative m-1">
            <button
              className="absolute right-2 top-2"
              onClick={() => {
                setDeleteMemberId(member.id);
                onOpenDeleteModal();
              }}
            >
              <AiFillDelete size={20} color="#fe4a49" />
            </button>
            <UserProfileCard member={member} canOpenDetail={false} />
          </div>
        ))}
        <button
          className="flex justify-center items-center m-5 w-[50px] h-[50px] bg-slate-600 rounded-full"
          onClick={onOpenAddModal}
        >
          <FaPlus size={30} />
        </button>
      </div>
    </>
  );
};
