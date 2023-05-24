import { LandingPage } from '@/components/landingPage/LandingPage';
import DefaultLayout from '@/components/layout/default';
import { useServer } from '@/hooks/repository/useServer';
import type { NextPage } from 'next';
import 'react-datepicker/dist/react-datepicker.css';

const Home: NextPage = () => {
  const server = useServer({ serverId: '1' });

  return (
    <DefaultLayout>
      <LandingPage />
    </DefaultLayout>
  );
};

export default Home;
