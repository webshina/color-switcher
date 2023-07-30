import { GuildItem } from '#/common/types/Guild';
import { UserItem } from '#/common/types/User';
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
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(
    props.user &&
      props.guild.managementMembers.some(
        (member) => member.discordId === props.user?.discordId
      ) &&
      props.guild.notificationsToGuildManager?.length > 0
      ? true
      : false
  );
  const onCloseModal = () => setIsOpenModal(false);

  return (
    <Modal
      closeOnOverlayClick={true}
      isOpen={isOpenModal}
      onClose={onCloseModal}
      isCentered
    >
      <ModalOverlay />
      <ModalContent bgColor="#222">
        <ModalCloseButton />
        <ModalHeader>ToDo</ModalHeader>
        <ModalBody>
          <div className="flex justify-start overflow-x-auto overflow-y-hidden">
            {props.guild.notificationsToGuildManager.map((notification) => (
              <>
                <div key={notification.id} className="m-2">
                  <NotificationCard
                    guild={props.guild}
                    notification={notification}
                  />
                </div>
              </>
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
