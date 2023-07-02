import { ChannelItem } from '#/common/types/Channel';
import { SaveBtn } from '@/components/common/SaveBtn';
import ErrorMessage from '@/components/utils/ErrorMessage';
import { useImagesUploader } from '@/hooks/utils/useImagesUpload';
import useValidate from '@/hooks/utils/useValidation';
import { post } from '@/utils/apiHelper';
import { useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import 'react-datepicker/dist/react-datepicker.css';
import { MdDragIndicator } from 'react-icons/md';

type Props = {
  channel: ChannelItem;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};
export const GuildChannelForm: React.FC<Props> = (props) => {
  const toast = useToast();
  const [generateAuto, setGenerateAuto] = useState(props.channel.autoGenerate);

  const { images, uploadForm } = useImagesUploader(
    false,
    props.channel.imageURL ? [props.channel.imageURL] : undefined,
    (imageList) => {
      saveImage(imageList[0].file as Blob);
    }
  );

  // Validations
  const { validationResults, isValidAll, revalidate } = useValidate([
    {
      name: 'image',
      value: images[0],
      required: true,
    },
  ]);

  const saveImage = async (image: Blob) => {
    try {
      const formData = new FormData();
      formData.append('image', image);
      await post(`/api/guild/channel/update/${props.channel.id}`, formData);
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
    <div className="w-[350px] m-1 border-[1px] border-slate-300 rounded-xl">
      <div
        className="flex items-center p-3 bg-white/10"
        {...props.dragHandleProps}
      >
        <MdDragIndicator size={20} />
        <div className="flex-1 text-lg text-center">{props.channel.name}</div>
      </div>
      <div className="my-2" />
      <div className="p-3">
        {uploadForm}
        <ErrorMessage
          label="image"
          message={validationResults.image?.message}
        />
        <div className="flex justify-end m-2">
          <SaveBtn onClick={() => {}} disabled={generateAuto} />
        </div>
      </div>
    </div>
  );
};
