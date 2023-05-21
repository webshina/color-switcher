import DefaultLayout from '@/components/layout/default';
import { LoadingSpinner } from '@/components/utils/LoadingSpinner';
import { useServer } from '@/hooks/repository/useServer';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { BsDiscord } from 'react-icons/bs';

const Create: NextPage = () => {
  const router = useRouter();
  const server = useServer({ serverId: '1' });
  const [loading, setLoading] = React.useState(false);

  const handleCreate = async () => {
    setLoading(true);
    setTimeout(() => {
      router.push('/');
    }, 3000);
  };

  return (
    <DefaultLayout>
      <div className="flex flex-col justify-center items-center">
        <div className="h-16" />
        <div className="px-8 py-3 bg-slate-800 rounded-md">
          自動的にサーバーの情報を取得して、あなたの
          <span className="mx-1 font-bold">Discord HOME</span>
          を自動で作成します。
        </div>
        <div className="h-16" />

        {!loading ? (
          <>
            <button
              className="flex items-center px-8 py-3 text-white gradient-bg-discord-purple-to-blue rounded-md"
              onClick={handleCreate}
            >
              <BsDiscord size={30} />
              <div className="w-4" />
              <div className="text-2xl">CONNECT</div>
            </button>
          </>
        ) : (
          <>
            <LoadingSpinner />
          </>
        )}
      </div>
      <div className="h-16" />
    </DefaultLayout>
  );
};

export default Create;
