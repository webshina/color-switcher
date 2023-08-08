import useSWRInfinite from 'swr/infinite';

export const useInfiniteLoad = <T>(
  url: string,
  fetcher: (url: string, index: number, pageSize: number) => Promise<any>,
  pageSize: number
) => {
  const { data, error, size, setSize } = useSWRInfinite<T[]>(
    (index) => [url, index, pageSize],
    fetcher
  );

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isEnd = isEmpty || (data && data[data.length - 1]?.length < pageSize);

  return {
    data,
    error,
    isLoadingInitialData,
    isLoadingMore,
    isEmpty,
    isEnd,
    size,
    setSize,
  };
};
