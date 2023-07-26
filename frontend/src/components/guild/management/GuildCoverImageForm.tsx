import { GuildItem } from '#/common/types/Guild';
import ErrorMessage from '@/components/utils/ErrorMessage';
import Title from '@/components/utils/Title';
import { useImagesUploader } from '@/hooks/utils/useImagesUpload';
import useValidate from '@/hooks/utils/useValidation';
import { post } from '@/utils/apiHelper';
import { useToast } from '@chakra-ui/react';
import 'react-datepicker/dist/react-datepicker.css';

type Props = {
  guild: GuildItem;
};
export const GuildCoverImageForm: React.FC<Props> = (props) => {
  const toast = useToast();
  const { images, uploadForm } = useImagesUploader(
    false,
    props.guild.coverImageUrl ? [props.guild.coverImageUrl] : undefined,
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

  const saveImage = async (coverImage: Blob) => {
    try {
      const formData = new FormData();
      formData.append('coverImage', coverImage);
      await post(`/api/guild/cover-image/update/${props.guild.id}`, formData);
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
      <Title title="Cover Image" />
      <div className="h-5" />
      {uploadForm}
      <ErrorMessage label="image" message={validationResults.image?.message} />
      <div className="h-5"></div>
    </>
  );
};
