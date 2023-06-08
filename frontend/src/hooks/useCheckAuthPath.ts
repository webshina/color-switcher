import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { UserItem } from 'types/User';
import wildcardMatch from 'wildcard-match';

export const useCheckAuthPath = (loadingUser: boolean, user?: UserItem) => {
  const router = useRouter();
  const isIncludedOnlyLoginPaths = wildcardMatch(['/owner/**']);

  useEffect(() => {
    if (!loadingUser) {
      if (isIncludedOnlyLoginPaths(router.pathname)) {
        if (!user) {
          router.push('/login');
        }
      }
    }
  }, [JSON.stringify(user)]);
};
