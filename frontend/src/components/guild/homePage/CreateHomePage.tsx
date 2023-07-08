import { messages } from '#/common/constants/messages';
import { ImageComponent } from '@/components/utils/ImageComponent';
import { useGuildBatchProgress } from '@/hooks/repository/useGuildBatchProgress';
import { useMyAdminGuilds } from '@/hooks/repository/useMyAdminGuilds';
import useInputField from '@/hooks/utils/useInputField';
import { post } from '@/utils/apiHelper';
import { isAxiosError } from '@/utils/typeNarrower';
import { useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { MdPrecisionManufacturing } from 'react-icons/md';
import { GuildBatchProgress } from './GuildBatchProgress';
import { InstallBotModal } from './InstallBotModal';

type Props = {};
export const CreateHomePage: React.FC<Props> = (props) => {
  const router = useRouter();
  const { data: adminGuilds } = useMyAdminGuilds();
  const [loading, setLoading] = useState(false);
  const [guildId, setGuildId] = useState<number>();
  const [guildBatchId, setGuildBatchId] = useState<number>();

  const {
    inputField: selectedGuildDiscordIdInputField,
    valueState: selectedGuildDiscordId,
  } = useInputField({
    id: 'guild-id',
    type: 'select',
    options:
      adminGuilds?.map((guild) => ({
        label: guild.name as string,
        value: guild.discordId,
      })) ?? [],
    value:
      adminGuilds?.[0]?.discordId ??
      'There is no server for which you have administrative privileges',
  });

  // Generate
  const generate = async () => {
    if (!selectedGuildDiscordId) return;
    try {
      setLoading(true);
      const res = await post(`/api/guild/${selectedGuildDiscordId}/generate`, {
        guildDiscordId: selectedGuildDiscordId,
      });
      setGuildId(res.data.guildId);
      setGuildBatchId(res.data.guildBatchId);
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.data === messages.botNotInstalled) {
          onOpenInstallBotModal();
        }
      }
    }
  };

  // Fetch batch progress
  const { data: progressData } = useGuildBatchProgress({
    guildId: guildBatchId,
  });
  useEffect(() => {
    if (progressData?.progressRate === 1) {
      router.push(`/guild/${guildId}`);
    }
  }, [progressData?.progressRate]);

  // Install bot modal
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
        onClose={() => {
          onCloseInstallBotModal();
          setLoading(false);
        }}
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
          {selectedGuildDiscordIdInputField}
          <div className="h-8" />
          {loading ? (
            <GuildBatchProgress
              progressRate={progressData?.progressRate ?? 0}
            />
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
