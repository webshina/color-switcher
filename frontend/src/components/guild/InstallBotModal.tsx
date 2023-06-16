import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from '@chakra-ui/react';
import 'react-datepicker/dist/react-datepicker.css';
import { HiCursorClick } from 'react-icons/hi';
import { ImageComponent } from '../utils/ImageComponent';

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};
export const InstallBotModal: React.FC<Props> = (props) => {
  return (
    <Modal
      closeOnOverlayClick={true}
      isOpen={props.isOpen}
      onClose={props.onClose}
      size="xl"
      isCentered
    >
      <ModalOverlay />
      <ModalContent bgColor="#222">
        <ModalCloseButton />
        <ModalBody>
          <div className="flex flex-col items-center w-full px-5 py-8">
            <div className="">Install Bot to Discord server !</div>
            <div className="h-8" />
            <ImageComponent
              imgSrc={`/images/landingPage/installBotToDiscordNoText.svg`}
              width={200}
              height={40}
              objectFit="contain"
            />
            <div className="h-8" />
            <button
              className="flex flex-col items-center px-4 py-2 gradient-bg-purple-to-pink rounded-xl"
              onClick={() => {
                window.open(
                  process.env.NEXT_PUBLIC_DISCORD_BOT_INVITE_URL,
                  '_blank'
                );
              }}
            >
              <div className="flex items-center">
                <HiCursorClick />
                <div className="w-2" />
                Click & Install
              </div>
            </button>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="whiteAlpha" mr={3} onClick={props.onClose}>
            Done
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
