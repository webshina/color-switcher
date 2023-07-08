import { GuildItem } from '#/common/types/Guild';
import { ToggleAutoGeneration } from '@/components/common/ToggleAutoGeneration';
import Title from '@/components/utils/Title';
import { post } from '@/utils/apiHelper';
import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { AiOutlineClose } from 'react-icons/ai';
import { IoMdAdd } from 'react-icons/io';
import { mutate } from 'swr';

type Props = {
  guild: GuildItem;
};
export const GuildTagForm: React.FC<Props> = (props) => {
  const toast = useToast();
  const [generateAuto, setGenerateAuto] = useState(
    props.guild.autoGenerateTags
  );
  const [newTagName, setNewTagName] = useState('');

  const addTag = async () => {
    try {
      if (newTagName === '') {
        toast({
          status: 'error',
          description: 'Tag name is empty',
          isClosable: true,
        });
        return;
      }
      await post(`/api/guild/tag/${props.guild.id}`, {
        method: 'create',
        tagName: newTagName,
      });
      await mutate('useGuild');
      setNewTagName('');
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

  const deleteTag = async (tagId: number) => {
    try {
      await post(`/api/guild/tag/${props.guild.id}`, {
        method: 'delete',
        tagId,
      });
      await mutate('useGuild');
      setNewTagName('');
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
      <Title title="Tags" />
      <div className="h-5" />
      <div className="flex justify-end">
        <ToggleAutoGeneration
          guildId={props.guild.id}
          target="tags"
          isChecked={generateAuto}
          onChange={(value) => {
            setGenerateAuto(value);
          }}
        />
      </div>
      <div className="h-5" />
      {props.guild.tags.map((tag) => (
        <div
          key={tag.id}
          className="inline-block bg-gray-700 rounded-full px-3 py-1 font-semibold text-gray-300 m-1"
        >
          <div className="flex items-center">
            <div>{tag.name}</div>
            <div className="w-2" />
            {!generateAuto && (
              <button
                onClick={() => {
                  deleteTag(tag.id);
                }}
              >
                <AiOutlineClose color="white" />
              </button>
            )}
          </div>
        </div>
      ))}
      {!generateAuto && (
        <div className="inline-block bg-gray-700 rounded-full px-3 py-1 font-semibold text-gray-300 m-1">
          <div className="flex items-center">
            <input
              type="text"
              value={newTagName}
              className="bg-slate-500"
              onChange={(e) => {
                setNewTagName(e.target.value);
              }}
            />
            <div className="w-2" />

            <button onClick={addTag}>
              <IoMdAdd />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
