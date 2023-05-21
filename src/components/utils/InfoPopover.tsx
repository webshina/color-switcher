import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { AiFillInfoCircle } from 'react-icons/ai';

type Props = {
  body: ReactNode;
};
const InfoPopover: React.FC<Props> = ({ body }) => {
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <button>
            <AiFillInfoCircle />
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>{body}</PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default InfoPopover;
