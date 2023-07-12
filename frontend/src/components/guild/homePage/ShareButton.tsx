import useInputField from '@/hooks/utils/useInputField';
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  useToast,
} from '@chakra-ui/react';
import 'react-datepicker/dist/react-datepicker.css';
import { BiCopy } from 'react-icons/bi';
import { FiShare2 } from 'react-icons/fi';

type Props = {
  message: string;
};
export const ShareButton: React.FC<Props> = (props) => {
  const toasts = useToast();
  const { inputField: shareMessageInputField, valueState: shareMessage } =
    useInputField({
      id: 'description',
      type: 'textarea',
      value: props.message,
      rows: 10,
    });

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareMessage);
    toasts({
      title: 'Copied!',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Popover>
      <PopoverTrigger>
        <button className="flex items-center px-8 py-2 gradient-bg-purple-to-pink rounded-full">
          <div className="font-bold">Share</div>
          <div className="w-2" />
          <FiShare2 size={20} />
        </button>
      </PopoverTrigger>
      <PopoverContent color="white" bg="blue.800" borderColor="blue.800">
        <PopoverArrow bg="blue.800" />
        <PopoverCloseButton />
        <PopoverHeader>Copy & Share this message</PopoverHeader>
        <PopoverBody>{shareMessageInputField}</PopoverBody>
        <PopoverFooter
          border="0"
          display="flex"
          alignItems="center"
          justifyContent="end"
          pb={4}
        >
          <Button colorScheme="pink" onClick={copyToClipboard}>
            <BiCopy />
            <div className="w-1" />
            Copy
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};
