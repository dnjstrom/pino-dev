import { repeatString } from "./repeatString";

export const padLinesWithSpaces = (
  amount: number,
  str: string,
  newline: string
): string => {
  const spaces = repeatString(amount, " ");
  return str.replace(new RegExp(`${newline}`, "g"), `${newline}${spaces}`);
};
