import { DiscordConnectBtn } from '@/components/common/DiscordConnectBtn';
import DefaultLayout from '@/components/layout/default';
import { ImageComponent } from '@/components/utils/ImageComponent';
import { useAuth } from '@/hooks/utils/useAuth';
import type { NextPage } from 'next';
import { useEffect } from 'react';
const Home: NextPage = () => {
  const { logout } = useAuth();
  useEffect(() => {
    logout();
  }, []);

  return (
    <>
      <DefaultLayout>
        <div className="flex flex-col items-center m-3 lg:m-24 p-8 lg:p-12 bg-dark-light rounded-lg">
          <div className="text-xl">Connect to Discord !</div>
          <div className="h-12"></div>
          <ImageComponent imgSrc="/images/login.svg" height={130} width={130} />
          <div className="h-12"></div>
          <DiscordConnectBtn />
        </div>
      </DefaultLayout>
    </>
  );
};

export default Home;
