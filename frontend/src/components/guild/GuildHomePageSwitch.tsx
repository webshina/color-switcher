import { useRouter } from 'next/router';
import 'react-datepicker/dist/react-datepicker.css';
import { AiFillHome, AiFillSetting } from 'react-icons/ai';

export type Page = 'home' | 'management';
type Props = {
  currentPage: Page;
  guildId: number;
};
export const GuildHomePageSwitch: React.FC<Props> = (props) => {
  return (
    <div className="flex justify-around w-full">
      <SwitchBtn
        page="home"
        text="HOME"
        icon={<AiFillHome size={20} />}
        currentPage={props.currentPage}
        guildId={props.guildId}
      />
      <SwitchBtn
        page="management"
        text="SETTING"
        icon={<AiFillSetting size={20} />}
        currentPage={props.currentPage}
        guildId={props.guildId}
      />
    </div>
  );
};

type SwitchBtnProps = {
  page: Page;
  text: string;
  icon: React.ReactNode;
  currentPage: Page;
  guildId: number;
};
const SwitchBtn: React.FC<SwitchBtnProps> = (props) => {
  const router = useRouter();

  return (
    <button
      className="flex flex-col justify-center items-center pt-2 w-1/2 text-sm lg:text-lg"
      style={{
        backgroundColor:
          props.currentPage === props.page
            ? 'rgba(255, 255, 255, 0.1)'
            : 'transparent',
      }}
      onClick={() => {
        router.push(`/guild/${props.guildId}?page=${props.page}`);
      }}
    >
      {props.icon}
      <div className="h-[0.5px]" />
      <div className="text-[8px]">{props.text}</div>
    </button>
  );
};
