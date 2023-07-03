import { AutoGenerateTarget } from '#/common/types/AutoGenerateTarget';
import { post } from '@/utils/apiHelper';
import { Switch, useToast } from '@chakra-ui/react';
import { BsRobot } from 'react-icons/bs';
import { mutate } from 'swr';

type Props = {
  guildId: number;
  channelId?: number;
  target: AutoGenerateTarget;
  isChecked: boolean;
  onChange: (value: boolean) => void;
};
export const ToggleAutoGeneration: React.FC<Props> = (props) => {
  const toast = useToast();

  const toggleAutoGeneration = async (value: boolean) => {
    try {
      await post(`/api/guild/toggle-auto-generation/${props.guildId}`, {
        target: props.target,
        value: value,
        channelId: props.channelId,
      });
      await mutate('useGuild');

      toast({
        status: 'success',
        description: 'Saved',
      });
    } catch (error) {
      toast({
        status: 'error',
        description: 'Failed',
        isClosable: true,
      });
    }
  };

  return (
    <div className="flex justify-end items-center">
      <BsRobot />
      <div className="w-2" />
      <div className="text-sm">Auto-AI Generation</div>
      <div className="w-2" />
      <Switch
        id="toggle-auto-generation"
        size="md"
        colorScheme="pink"
        isChecked={props.isChecked}
        onChange={(e) => {
          toggleAutoGeneration(e.target.checked);
          props.onChange(e.target.checked);
        }}
      />
    </div>
  );
};
