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
import { BsFillExclamationCircleFill } from 'react-icons/bs';
import { MdPrecisionManufacturing } from 'react-icons/md';
import { mutate } from 'swr';
import { GuildBatchProgress } from './GuildBatchProgress';
import { InstallBotModal } from './InstallBotModal';

type Props = {
  guildDiscordId?: string;
};
export const CreateHomePage: React.FC<Props> = (props) => {
  const router = useRouter();
  const { data: adminGuilds } = useMyAdminGuilds();
  const [loading, setLoading] = useState(false);
  const [guildId, setGuildId] = useState<number>();
  const [guildBatchId, setGuildBatchId] = useState<number>();

  // Selected guild input field
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
    value: props.guildDiscordId ?? adminGuilds?.[0]?.discordId,
    placeholder:
      adminGuilds && adminGuilds?.length > 0
        ? 'Select a server'
        : 'No administrative servers',
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

  // Fetch batch progress every 1 second
  const { data: progressData } = useGuildBatchProgress({
    guildBatchId,
  });
  // reset progress
  useEffect(() => {
    mutate('useGuildBatchProgress', {
      ...progressData,
      progressRate: 0,
    });
  }, []);
  useEffect(() => {
    if (progressData?.progressRate === 1) {
      router.push(`/guild/${guildId}`);
    }
  }, [progressData]);

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
        <div className="text-2xl">Generate your discord HOME !</div>
        <ImageComponent
          imgSrc={`/images/undraw_artificial_intelligence_re_enpp.svg`}
          width={300}
          height={300}
          objectFit="contain"
        />
        <div className="flex flex-col items-center">
          <div>{selectedGuildDiscordIdInputField}</div>
          <div className="h-8" />
          <div className="flex ">
            <BsFillExclamationCircleFill size={20} />
            <div className="w-2" />
            <div className="text-gray-200">
              Only servers with <span className="font-bold">MANAGEMENT</span>{' '}
              privileges are displayed
            </div>
          </div>
          <div className="h-8" />
          {loading ? (
            <GuildBatchProgress
              progressRate={progressData?.progressRate ?? 0}
            />
          ) : (
            selectedGuildDiscordId && (
              <button
                id="generate-btn"
                className="flex justify-center items-center px-8 py-4  disabled:bg-slate-900 gradient-bg-purple-to-pink rounded-xl border border-gray-600 font-bold text-lg"
                onClick={generate}
                disabled={!selectedGuildDiscordId}
              >
                <MdPrecisionManufacturing size={30} />
                <div className="w-2" />
                Generate
              </button>
            )
          )}
        </div>
      </div>
    </>
  );
};
