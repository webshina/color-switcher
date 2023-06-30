import { UserItem } from '#/common/types/User';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import wildcardMatch from 'wildcard-match';

export const useCheckAuthPath = (loadingUser: boolean, user?: UserItem) => {
  const router = useRouter();
  const isIncludedOnlyLoginPaths = wildcardMatch([
    '/guild/create',
    '/owner/**',
  ]);

  useEffect(() => {
    if (!loadingUser) {
      if (isIncludedOnlyLoginPaths(router.pathname)) {
        if (!user) {
          router.push('/auth/login');
        }
      }
    }
  }, [JSON.stringify(user)]);
};
