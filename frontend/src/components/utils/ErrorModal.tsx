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
import 'react-pro-sidebar/dist/css/styles.css';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
export const ErrorModal: React.FC<Props> = (props: Props) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody></ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={props.onClose}>
            キャンセル
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
