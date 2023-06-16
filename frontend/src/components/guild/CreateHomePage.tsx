import { messages } from '#/common/constants/messages';
import { useAuth } from '@/hooks/utils/useAuth';
import useInputField from '@/hooks/utils/useInputField';
import { post } from '@/utils/apiHelper';
import { isAxiosError } from '@/utils/typeNarrower';
import { useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { MdPrecisionManufacturing } from 'react-icons/md';
import { ImageComponent } from '../utils/ImageComponent';
import { LoadingSpinner } from '../utils/LoadingSpinner';
import { InstallBotModal } from './InstallBotModal';

type Props = {};
export const CreateHomePage: React.FC<Props> = (props) => {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const manageableGuilds = user?.guilds.filter((guild) => guild.manageable);

  const {
    inputField: guildIdInputField,
    valueState: guildId,
    setValueState: setGuildId,
  } = useInputField({
    id: 'guild-id',
    type: 'select',
    options:
      manageableGuilds?.map((guild) => ({
        label: guild.name as string,
        value: guild.discordId,
      })) ?? [],
    value:
      manageableGuilds?.[0]?.discordId ??
      'There is no server for which you have administrative privileges',
  });

  const generate = async () => {
    if (!guildId) return;
    try {
      setLoading(true);
      const res = await post('/api/guild/generate', {
        discordId: guildId,
      });
      const createdGuildId = res.data.guildId;
      router.push(`/guild/${createdGuildId}`);
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.response?.data);
        if (error.response?.data === messages.botNotInstalled) {
          onOpenInstallBotModal();
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const {
    isOpen: isOpenInstallBotModal,
    onOpen: onOpenInstallBotModal,
    onClose: onCloseInstallBotModal,
  } = useDisclosure();

  return (
    <>
      {/* Modals */}
      <InstallBotModal
        isOpen={isOpenInstallBotModal}
        onOpen={onOpenInstallBotModal}
        onClose={onCloseInstallBotModal}
      />

      <div className="flex flex-col items-center w-full p-24 bg-slate-900 rounded-xl">
        <div className="text-2xl">Create your discord HOME !</div>
        <ImageComponent
          imgSrc={`/images/undraw_artificial_intelligence_re_enpp.svg`}
          width={300}
          height={300}
          objectFit="contain"
        />
        <div className="flex flex-col items-center">
          {guildIdInputField}
          <div className="h-8" />
          {loading ? (
            <LoadingSpinner />
          ) : (
            <button
              className="flex justify-center items-center px-8 py-4 gradient-bg-purple-to-pink rounded-xl border border-gray-600 font-bold text-lg"
              onClick={generate}
            >
              <MdPrecisionManufacturing size={30} />
              <div className="w-2" />
              Create
            </button>
          )}
        </div>
      </div>
    </>
  );
};
