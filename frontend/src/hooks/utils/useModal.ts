import Modal from '@/components/utils/Modal';
import { ReactNode, useState } from 'react';

type Props = {
  title?: string;
  message?: string;
  noPadding?: boolean;
  children?: ReactNode;
  onClose?: () => void;
};
const useModal = (props: Props) => {
  const [isShow, setIsShow] = useState(false);
  const [messageState, setMessageState] = useState(props.message);
  const [onCloseState, setOnCloseState] = useState(() => props.onClose);

  const modal = Modal({
    show: isShow,
    setShow: setIsShow,
    title: props.title,
    message: messageState,
    noPadding: props.noPadding ?? false,
    children: props.children,
    onClose: onCloseState,
  });

  return {
    modal,
    isShow,
    setIsShow,
    setMessageState,
    setOnCloseState,
  };
};

export default useModal;
