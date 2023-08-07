import React, { useEffect, useRef } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

type Props = {
  loadMore: () => void;
  onLoadCompleted?: () => void;
  items: any[];
  itemMaxCnt: number | null;
};
export const InfiniteLoader: React.FC<Props> = (props) => {
  const loaderRef = useRef(null);

  const isLoadCompleted =
    props.itemMaxCnt && props.items.length >= props.itemMaxCnt;

  // For infinite scroll
  useEffect(() => {
    var options = {
      root: null, // use the document's viewport as the container
      rootMargin: '0px',
      threshold: 1.0, // trigger when the observer intersect at least 100% of the target
    };

    const observer = new IntersectionObserver(handleObserver, options);

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    function handleObserver(entities: IntersectionObserverEntry[]) {
      const target = entities[0];
      // If loader is visible, invoke the fetch function
      if (target.isIntersecting) {
        props.loadMore();
      }
    }

    // Clean up
    return () => {
      observer.disconnect();
    };
  }, [props.items.length, props.itemMaxCnt]);

  return (
    <>
      {!isLoadCompleted && (
        <div ref={loaderRef} className="flex justify-center">
          <LoadingSpinner />
        </div>
      )}
    </>
  );
};
