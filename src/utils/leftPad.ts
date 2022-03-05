import { repeatString } from "./repeatString";

export const leftPad = (
  amount: number,
  str: string,
  padCharacter = " "
): string => repeatString(amount, padCharacter) + str;
