export const haveGaps = (arr1: any[], arr2: any[]): boolean => {
  return (
    new Set(arr1).size !== new Set(arr2).size ||
    arr1.some((item) => !arr2.includes(item))
  );
};
