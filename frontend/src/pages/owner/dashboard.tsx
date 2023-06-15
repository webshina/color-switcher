import DefaultLayout from '@/components/layout/default';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import 'react-datepicker/dist/react-datepicker.css';
import { BsHouseAddFill } from 'react-icons/bs';

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <DefaultLayout>
      <div className="flex flex-col items-center">
        <button
          className="flex items-center px-4 py-2 gradient-bg-purple-to-pink rounded-xl"
          onClick={() => {
            router.push('/guild/create');
          }}
        >
          <BsHouseAddFill />
          <div className="w-2" />
          Create Discord HOME
        </button>
      </div>
    </DefaultLayout>
  );
};

export default Home;
