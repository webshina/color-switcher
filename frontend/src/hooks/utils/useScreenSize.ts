import { useEffect, useState } from 'react';

export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState<'sm' | 'lg'>('sm');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');

    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setScreenSize('sm');
      } else {
        setScreenSize('lg');
      }
    };

    mediaQuery.addEventListener('change', handleMediaQueryChange);

    // Dispatch initial event to set initial state
    mediaQuery.dispatchEvent(
      new MediaQueryListEvent('change', { matches: mediaQuery.matches })
    );

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  return screenSize;
};
