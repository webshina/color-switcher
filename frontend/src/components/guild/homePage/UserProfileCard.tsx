import { GuildMemberItem } from '#/common/types/Guild';
import { ActivityLevel } from '@/components/common/ActiveLevel';
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

type Props = {
  member: GuildMemberItem;
  canOpenDetail?: boolean;
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
            <UserProfile discordMember={props.member} />
          </ModalBody>
        </ModalContent>
      </Modal>

      <button
        id="user-profile-card"
        style={{
          cursor: props.canOpenDetail ?? true ? 'pointer' : 'default',
        }}
        onClick={props.canOpenDetail ?? true ? onOpenModal : undefined}
      >
        <div className="flex flex-col rounded-xl">
          <div className="flex h-[150px]">
            {/* User image */}
            <div className="relative w-[150px]">
              <Image
                src={
                  props.member.avatarURL ?? '/images/snsIcons/Discord_dark.svg'
                }
                alt="image"
                layout="fill"
                objectFit="cover"
                className="rounded-l-xl"
              />
            </div>
            <div className="flex flex-col items-start w-[200px] p-3 bg-slate-900 rounded-r-xl">
              <div className="text-left text-base font-bold">
                {props.member.displayName}{' '}
                <span className="text-xs font-light">{props.member.name}</span>
              </div>
              <div className="h-2" />

              {/* Active */}
              <ActivityLevel level={props.member.activityScore ?? 0} />
            </div>
          </div>
        </div>
      </button>
    </>
  );
};
