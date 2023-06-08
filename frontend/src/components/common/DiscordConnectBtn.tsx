import { useAuth } from '@/hooks/utils/useAuth';
import { useRouter } from 'next/router';
import { BsDiscord } from 'react-icons/bs';

type Props = {};
export const DiscordConnectBtn: React.FC<Props> = (props) => {
  const router = useRouter();
  const { user } = useAuth();
  const redirect = () => {
    router.push(
      'https://discord.com/api/oauth2/authorize?client_id=1110729993228652574&redirect_uri=http%3A%2F%2Flocalhost%3A3004%2Fauth%2Fcallback&response_type=code&scope=identify'
    );
  };
  return !user ? (
    <button
      className="flex justify-center items-center bg-discord-purple rounded-lg px-4 py-2"
      onClick={redirect}
    >
      <BsDiscord size={25} />
      <div className="w-3" />
      <div className="text-base font-bold">Discord Connect</div>
    </button>
  ) : (
    <></>
  );
};
