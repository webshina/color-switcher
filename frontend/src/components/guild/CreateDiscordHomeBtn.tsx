import { useRouter } from 'next/router';
import { BsDiscord } from 'react-icons/bs';

export const CreateDiscordHomeBtn = () => {
  const router = useRouter();
  return (
    <button
      className="flex px-3 py-2 rounded-md  bg-gradient-to-br from-discord-purple to-[#4792ed]"
      onClick={() => {
        router.push('/create');
      }}
    >
      <BsDiscord size={20} />
      <div className="w-2" />
      <div className="font-medium">Create Your Page</div>
    </button>
  );
};
