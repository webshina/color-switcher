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

export const adjustOutliers = (
  values: number[],
  topExclude: number = 0.05,
  bottomExclude: number = 0.05
) => {
  // Exclude outliers
  const sorted = values.sort((a, b) => a - b);
  const top = Math.floor(values.length * (1 - topExclude));
  const bottom = Math.floor(values.length * bottomExclude);
  const filtered = sorted.slice(bottom, top);

  // Adjust outliers
  const filteredMin = Math.min(...filtered);
  const filteredMax = Math.max(...filtered);
  const adjusted = values.map((value) => {
    if (value < filteredMin) return filteredMin;
    if (value > filteredMax) return filteredMax;
    return value;
  });

  return adjusted;
};
