import { post } from '@/utils/apiHelper';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import 'react-datepicker/dist/react-datepicker.css';
import { RiGitRepositoryPrivateFill } from 'react-icons/ri';
import { mutate } from 'swr';

type Props = {
  guildId: number;
  isPrivate: boolean;
};
export const GuildPublishToggle: React.FC<Props> = (props) => {
  const toast = useToast();

  const {
    isOpen: isOpenConfirmationModal,
    onOpen: onOpenConfirmationModal,
    onClose: onCloseConfirmationModal,
  } = useDisclosure();

  const togglePublish = (isPrivate: boolean) => {
    if (isPrivate) {
      onOpenConfirmationModal();
    } else {
      changePublishStatusByApi(false);
    }
  };

  const fixPrivatize = async () => {
    await changePublishStatusByApi(true);
    onCloseConfirmationModal();
  };

  const changePublishStatusByApi = async (isPrivate: boolean) => {
    await post(`/api/guild/update/${props.guildId}`, {
      isPrivate,
    });
    await mutate('useGuild');
    toast({
      status: 'success',
      description: 'Saved',
    });
  };

  return (
    <>
      {/* Confirmation modal */}
      <Modal
        closeOnOverlayClick={true}
        isOpen={isOpenConfirmationModal}
        onClose={onCloseConfirmationModal}
        isCentered
      >
        <ModalOverlay />
        <ModalContent bgColor="#222">
          <ModalCloseButton />
          <ModalHeader>Want to privatize this homepage?</ModalHeader>
          <ModalBody>
            <div className="flex justify-center">
              If you choose to make it private, only the administrator will be
              able to view the homepage.
            </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="pink" mr={3} onClick={fixPrivatize}>
              Yes
            </Button>
            <Button
              colorScheme="whiteAlpha"
              mr={3}
              onClick={onCloseConfirmationModal}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <div className="flex items-center">
        <RiGitRepositoryPrivateFill />
        <div className="w-2" />
        <div className="">Private</div>
        <div className="w-2" />
        <Switch
          id="toggle-auto-generation"
          size="md"
          colorScheme="pink"
          isChecked={props.isPrivate}
          onChange={(e) => {
            togglePublish(e.target.checked);
          }}
        />
      </div>
    </>
  );
};
