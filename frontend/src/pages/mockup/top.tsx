import DefaultLayout from '@/components/layout/default';
import { Top } from '@/components/mockup/Top';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import 'react-datepicker/dist/react-datepicker.css';

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <DefaultLayout>
      <Top />
    </DefaultLayout>
  );
};

export default Home;
