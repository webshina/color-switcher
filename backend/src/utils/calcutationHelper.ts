export const standardize = (
  value: number,
  values: number[],
  rangeMax: number = 1,
  rangeMin: number = 0
) => {
  const min = Math.min(...values);
  const max = Math.max(...values);
  if (min === max) return 0;

  return ((value - min) / (max - min)) * (rangeMax - rangeMin) + rangeMin;
};
