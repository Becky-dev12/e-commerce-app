/**
 * Format a number as Ethiopian Birr.
 * Examples:
 *   formatETB(3500)   → "ETB 3,500.00"
 *   formatETB(750)    → "ETB 750.00"
 */
export const formatETB = (amount) => {
  const num = Number(amount);
  if (isNaN(num)) return 'ETB 0.00';
  return `ETB ${num.toLocaleString('en-ET', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};
