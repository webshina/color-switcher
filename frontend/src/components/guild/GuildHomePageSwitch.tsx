import { useRouter } from 'next/router';
import 'react-datepicker/dist/react-datepicker.css';
import { AiFillHome, AiFillSetting } from 'react-icons/ai';

export type Page = 'home' | 'management';
type Props = {
  currentPage: Page;
  guildId: number;
};
export const GuildHomePageSwitch: React.FC<Props> = (props) => {
  const router = useRouter();

  return (
    <div className="flex w-[600px] m-2 justify-center border-2 border-white/50 rounded-xl">
      <button
        className="flex justify-center items-center p-2 w-1/2 text-lg"
        style={{
          backgroundColor:
            props.currentPage === 'home'
              ? 'rgba(255, 255, 255, 0.1)'
              : 'transparent',
        }}
        onClick={() => {
          router.push(`/guild/${props.guildId}`);
        }}
      >
        <AiFillHome size={20} />
        <div className="w-2" />
        HOME
      </button>
      <button
        className="flex justify-center items-center p-2 w-1/2 text-lg"
        style={{
          backgroundColor:
            props.currentPage === 'management'
              ? 'rgba(255, 255, 255, 0.1)'
              : 'transparent',
        }}
        onClick={() => {
          router.push(`/guild/${props.guildId}?page=management`);
        }}
      >
        <AiFillSetting size={20} />
        <div className="w-2" />
        MANAGEMENT
      </button>
    </div>
  );
};
