import { LandingPage } from '@/components/landingPage/LandingPage';
import DefaultLayout from '@/components/layout/default';
import type { NextPage } from 'next';
import 'react-datepicker/dist/react-datepicker.css';

const Home: NextPage = () => {
  return (
    <DefaultLayout
      showLogo={false}
      bgClassName="bg-gradient-to-b from-[#1F215A] from-5% to-dark to-40%"
      noPadding
    >
      <LandingPage />
    </DefaultLayout>
  );
};

export default Home;
