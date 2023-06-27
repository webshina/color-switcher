import { GuildMemberItem } from '#/common/types/GuildMember';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import { UserProfile } from './UserProfile';
import { ActivityLevel } from './common/ActiveLevel';

type Props = {
  discordMember: GuildMemberItem;
};

export const UserProfileCard: React.FC<Props> = (props) => {
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();

  return (
    <>
      <Modal
        closeOnOverlayClick={true}
        isOpen={isOpenModal}
        onClose={onCloseModal}
        size="xl"
        isCentered
      >
        <ModalOverlay />
        <ModalContent bgColor="transparent">
          <ModalBody className="flex justify-center items-center">
            <UserProfile discordMember={props.discordMember} />
          </ModalBody>
        </ModalContent>
      </Modal>

      <button id="user-profile-card" onClick={onOpenModal}>
        <div className="flex flex-col rounded-xl">
          <div className="flex h-[150px]">
            {/* User image */}
            <div className="relative w-[150px]">
              <Image
                src={props.discordMember.imgURL}
                alt="image"
                layout="fill"
                objectFit="cover"
                className="rounded-l-xl"
              />
            </div>
            <div className="flex flex-col items-start w-[200px] p-3 bg-slate-900 rounded-r-xl">
              <div className="text-base font-bold">
                {props.discordMember.displayName}{' '}
                <span className="text-xs font-light">
                  {props.discordMember.userName}
                </span>
              </div>
              <div className="h-1" />
              <div className="text-[12px] text-start">
                {props.discordMember.description}
              </div>
              <div className="h-2" />

              {/* Active */}
              <ActivityLevel level={props.discordMember.activityLevel} />
            </div>
          </div>
        </div>
      </button>
    </>
  );
};
