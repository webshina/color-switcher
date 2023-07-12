import { GuildItem } from '#/common/types/Guild';
import { SaveBtn } from '@/components/common/SaveBtn';
import { ToggleAutoGeneration } from '@/components/common/ToggleAutoGeneration';
import ErrorMessage from '@/components/utils/ErrorMessage';
import Title from '@/components/utils/Title';
import useInputField from '@/hooks/utils/useInputField';
import useValidate from '@/hooks/utils/useValidation';
import { post } from '@/utils/apiHelper';
import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

type Props = {
  guild: GuildItem;
};
export const GuildShareMessageForm: React.FC<Props> = (props) => {
  const toast = useToast();
  const [generateAuto, setGenerateAuto] = useState(
    props.guild.autoGenerateShareMessage
  );

  const { inputField: shareMessageInputField, valueState: shareMessage } =
    useInputField({
      id: 'shareMessage',
      type: 'textarea',
      value: props.guild.shareMessage,
      rows: 10,
      disabled: generateAuto,
    });

  // Validations
  const { validationResults, isValidAll } = useValidate([
    {
      name: 'shareMessage',
      value: shareMessage,
      required: true,
      max: 2000,
    },
  ]);

  const save = async () => {
    try {
      if (!isValidAll()) {
        return;
      }
      const formData = new FormData();
      formData.append('shareMessage', shareMessage);
      await post(`/api/guild/update/${props.guild.id}`, formData);
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
    <>
      <Title title="ShareMessage" />
      <div className="h-5" />
      <div className="flex justify-end">
        <ToggleAutoGeneration
          guildId={props.guild.id}
          target="shareMessage"
          isChecked={generateAuto}
          onChange={(value) => {
            setGenerateAuto(value);
          }}
        />
      </div>
      <div className="h-5" />
      {shareMessageInputField}
      <ErrorMessage
        label="image"
        message={validationResults.shareMessage?.message}
      />
      <div className="flex justify-end m-2">
        <SaveBtn onClick={() => save()} disabled={generateAuto} />
      </div>
    </>
  );
};
