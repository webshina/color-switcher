import { GuildItem } from '#/common/types/Guild';
import { UserItem } from '#/common/types/User';
import { useScreenSize } from '@/hooks/utils/useScreenSize';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React from 'react';
import { NotificationCard } from './NotificationCard';

type Props = {
  guild: GuildItem;
  user?: UserItem | null;
};
export const NotificationsToManager: React.FC<Props> = (props) => {
  const screenSize = useScreenSize();
  const isOwner = props.user?.guilds.some(
    (guild) => guild.id === props.guild.id && guild.isOwner
  );
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(
    isOwner && props.guild.notificationsToGuildManager?.length > 0
      ? true
      : false
  );
  const onCloseModal = () => setIsOpenModal(false);

  return (
    <Modal
      closeOnOverlayClick={true}
      isOpen={isOpenModal}
      onClose={onCloseModal}
      size={screenSize === 'lg' ? '2xl' : 'sm'}
      isCentered
    >
      <ModalOverlay />
      <ModalContent bgColor="#222">
        <ModalCloseButton />
        <ModalHeader>ToDo</ModalHeader>
        <ModalBody>
          <div className="flex flex-col justify-start items-center overflow-x-auto overflow-y-hidden">
            {props.guild.notificationsToGuildManager.map((notification) => (
              <div key={notification.id} className="my-2 w-full">
                <NotificationCard
                  guild={props.guild}
                  notification={notification}
                />
              </div>
            ))}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="whiteAlpha" mr={3} onClick={onCloseModal}>
            Do it later
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
