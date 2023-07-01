import { CreateHomePage } from '@/components/guild/homePage/CreateHomePage';
import DefaultLayout from '@/components/layout/default';
import type { NextPage } from 'next';
import 'react-datepicker/dist/react-datepicker.css';

const Home: NextPage = () => {
  return (
    <DefaultLayout>
      <CreateHomePage />
    </DefaultLayout>
  );
};

export default Home;
