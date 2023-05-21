import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import { IoMdClose } from 'react-icons/io';

type ModalProps = {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  title?: string;
  message?: string;
  children?: ReactNode;
  noPadding?: boolean;
  onClose?: () => void;
};
const Modal: React.FC<ModalProps> = ({
  show,
  setShow,
  title,
  message,
  children,
  noPadding = false,
  onClose = () => {},
}) => {
  if (show) {
    return (
      <>
        <div
          id="overlay"
          className="flex flex-col justify-center items-center fixed top-0 left-0 w-full h-full bg-slate-600/30 z-50"
          onClick={() => {
            setShow(false);
            onClose();
          }}
        >
          <div
            className={`z-50 overflow-auto ${
              !noPadding &&
              'w-11/12 lg:w-1/2 px-3 lg:px-8 pt-3 pb-10 p-0 bg-slate-700/90 rounded-md text-white'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col justify-center items-center">
              <button
                id="modal-close-btn"
                onClick={() => {
                  setShow(false);
                  onClose();
                }}
                className={`flex-none ${
                  noPadding ? 'absolute top-30 right-10' : 'self-end'
                }`}
              >
                <IoMdClose color="#fff" size={30}></IoMdClose>
              </button>
              <div id="modal-title" className="flex-none text-xl font-bold">
                {title}
              </div>
              <div className="my-2"></div>
              <div id="modal-msg" className="flex-none whitespace-pre-wrap">
                {message}
              </div>
              <div className="my-2"></div>
              <div id="modal-children" className="w-full text-center">
                {children}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default Modal;
