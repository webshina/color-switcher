import DefaultLayout from '@/components/layout/default';
import { ImageComponent } from '@/components/utils/ImageComponent';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import 'react-datepicker/dist/react-datepicker.css';
import { HiCursorClick } from 'react-icons/hi';
import { MdPrecisionManufacturing } from 'react-icons/md';

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <DefaultLayout>
      <div className="flex flex-col items-center">
        <div className="h-12" />
        <div className="font-light underline underline-offset-4">STEP 1</div>
        <div className="h-8" />
        <div className="">Install Bot to Discord server !</div>
        <div className="h-8" />

        <button
          className="flex flex-col items-center px-4 py-4 bg-gray-400/20 border-solid border-2 border-white/50 rounded-xl drop-shadow-[5px_5px_5px_rgba(255,255,255,0.10)]"
          onClick={() => {
            window.open(
              process.env.NEXT_PUBLIC_DISCORD_BOT_INVITE_URL,
              '_blank'
            );
          }}
        >
          <ImageComponent
            imgSrc={`/images/landingPage/installBotToDiscordNoText.svg`}
            width={200}
            height={40}
            objectFit="contain"
          />
          <div className="h-2" />
          <div className="flex items-center">
            <HiCursorClick />
            <div className="w-2" />
            CLICK
          </div>
        </button>
        <div className="h-24" />

        <div className="font-light underline underline-offset-4">STEP 2</div>
        <div className="h-8" />
        <div className="">Generate your discord HOME !</div>
        <div className="h-8" />
        <button
          className="flex justify-center items-center px-8 py-4 gradient-bg-purple-to-pink rounded-xl border border-gray-600"
          onClick={() => {}}
        >
          <MdPrecisionManufacturing size={30} />
          <div className="w-2" />
          GENERATE
        </button>
      </div>
    </DefaultLayout>
  );
};

export default Home;
