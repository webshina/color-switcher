import { ChannelItem } from '#/common/types/Channel';
import { useImagesUploader } from '@/hooks/utils/useImagesUpload';
import useValidate from '@/hooks/utils/useValidation';
import { post } from '@/utils/apiHelper';
import { Checkbox, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import 'react-datepicker/dist/react-datepicker.css';
import { MdDragIndicator } from 'react-icons/md';
import { ConversationSummaries } from '../homePage/ConversationSummaries';

type Props = {
  channel: ChannelItem;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};
export const GuildChannelForm: React.FC<Props> = (props) => {
  const toast = useToast();
  const [showConversationSummary, setShowConversationSummary] = useState(
    props.channel.showConversationSummary
  );

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
      await post(
        `/api/guild/${props.channel.guildId}/channel/${props.channel.id}`,
        formData
      );
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

  const toggleShowConversationSummary = async (value: boolean) => {
    setShowConversationSummary(value);
    try {
      const formData = new FormData();
      formData.append('showConversationSummary', value.toString());
      await post(
        `/api/guild/${props.channel.guildId}/channel/${props.channel.id}`,
        formData
      );
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
        <div className="h-5" />
        <div className="flex justify-between">
          <div>AI Summary</div>
          <div>
            <Checkbox
              id={props.channel.id.toString()}
              isChecked={showConversationSummary}
              onChange={(e) => {
                toggleShowConversationSummary(e.target.checked);
              }}
            >
              show
            </Checkbox>
          </div>
        </div>
        <div className="h-3" />
        {showConversationSummary && (
          <ConversationSummaries summaries={props.channel.summaries} />
        )}
      </div>
    </div>
  );
};
