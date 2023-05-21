import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { User } from 'types/User';
import wildcardMatch from 'wildcard-match';

export const useCheckAuthPath = (loadingUser: boolean, user?: User) => {
  const router = useRouter();
  const isIncludedOnlyCustomerPaths = wildcardMatch(['/customer/**']);
  const isIncludedOnlyTrainerPaths = wildcardMatch(['/trainer/**']);
  const isIncludedOnlyAdminPaths = wildcardMatch(['/admin/**']);

  useEffect(() => {
    if (!loadingUser) {
      if (isIncludedOnlyCustomerPaths(router.pathname)) {
        if (user?.type !== 'customer') {
          router.push('/login');
        }
      } else if (isIncludedOnlyTrainerPaths(router.pathname)) {
        if (user?.type !== 'trainer') {
          router.push('/login');
        }
      } else if (isIncludedOnlyAdminPaths(router.pathname)) {
        if (user?.type !== 'admin') {
          router.push('/login');
        }
      }
    }
  }, [JSON.stringify(user)]);
};
