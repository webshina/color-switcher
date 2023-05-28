import DefaultLayout from '@/components/layout/default';
import { ServerHomePage } from '@/components/server/ServerHomePage';
import type { NextPage } from 'next';
import 'react-datepicker/dist/react-datepicker.css';

const Home: NextPage = () => {
  return (
    <DefaultLayout>
      <ServerHomePage serverId={Number(1)} />
    </DefaultLayout>
  );
};

export default Home;
