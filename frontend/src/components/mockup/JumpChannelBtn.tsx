import { useToast } from '@chakra-ui/react';
import { BsDiscord } from 'react-icons/bs';

type Props = {};
export const JumpChannelBtn: React.FC<Props> = (props) => {
  const toast = useToast();

  const showMessage = () => {
    toast({
      title: 'Sorry, this feature is not available yet.',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <button
      className="flex items-center px-4 py-2 text-white gradient-bg-discord-purple-to-blue rounded-md"
      onClick={showMessage}
    >
      <BsDiscord size={20} />
      <div className="w-2" />
      <div className="text-sm font-semibold">Go !!!</div>
    </button>
  );
};
