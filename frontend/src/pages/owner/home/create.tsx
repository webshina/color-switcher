import DefaultLayout from '@/components/layout/default';
import { ImageComponent } from '@/components/utils/ImageComponent';
import { useAuth } from '@/hooks/utils/useAuth';
import { Select } from '@chakra-ui/react';
import type { NextPage } from 'next';
import 'react-datepicker/dist/react-datepicker.css';
import { HiCursorClick } from 'react-icons/hi';
import { MdPrecisionManufacturing } from 'react-icons/md';

const Home: NextPage = () => {
  const { user } = useAuth();
  const manageableGuilds = user?.guilds.filter((guild) => guild.manageable);

  const generate = () => {};

  return (
    <DefaultLayout>
      <div className="flex flex-col items-center">
        <div className="w-[300px]">
          <div className="h-12" />
          <div className="flex flex-col items-center w-full px-5 py-8 bg-slate-800 rounded-xl">
            <div className="font-light underline underline-offset-4">
              STEP 1
            </div>
            <div className="h-8" />
            <div className="">Install Bot to Discord server !</div>
            <div className="h-8" />

            <button
              className="flex flex-col items-center px-4 py-4 gradient-bg-purple-to-pink rounded-xl"
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
          </div>
          <div className="h-24" />

          <div className="flex flex-col items-center px-5 py-8 bg-slate-800 rounded-xl">
            <div className="font-light underline underline-offset-4">
              STEP 2
            </div>
            <div className="h-8" />
            <div className="">Generate your discord HOME !</div>
            <div className="h-8" />
            <div className="flex flex-col items-center">
              <Select placeholder="Choose Server ...">
                {manageableGuilds?.map((guild) => (
                  <option key={guild.id} value={guild.id}>
                    {guild.name}
                  </option>
                ))}
              </Select>
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
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Home;
