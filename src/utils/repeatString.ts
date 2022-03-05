export const repeatString = (amount: number, str: string): string =>
  new Array(Math.max(amount, 0) + 1).join(str);
