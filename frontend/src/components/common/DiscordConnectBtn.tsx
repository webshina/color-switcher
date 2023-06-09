import { useAuth } from '@/hooks/utils/useAuth';
import { useRouter } from 'next/router';
import { BsDiscord } from 'react-icons/bs';

type Props = {};
export const DiscordConnectBtn: React.FC<Props> = (props) => {
  const router = useRouter();
  const { user, loadingUser } = useAuth();
  const redirect = () => {
    router.push(process.env.NEXT_PUBLIC_DISCORD_OAUTH_URL!);
  };
  return !user && !loadingUser ? (
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
