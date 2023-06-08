export const useServerCategories = (props: { serverId: string }) => {
  const categories = [
    { id: 1, name: 'Technology' },
    { id: 2, name: 'IT' },
    { id: 3, name: 'web3' },
    { id: 4, name: 'Engineer' },
    { id: 5, name: 'Blockchain' },
  ];
  return categories;
};
