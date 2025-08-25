export function convertObjectDataToNumber(object: object) {
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => {
      const numericValue = Number(value);
      return [key, isNaN(numericValue) ? value : numericValue];
    })
  );
}
