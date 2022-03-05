import { Falsy } from "../types";

const repeatString = (amount: number, str: string): string =>
  new Array(Math.max(amount, 0) + 1).join(str);

export const leftPad = (
  amount: number,
  str: string,
  padCharacter = " "
): string => repeatString(amount, padCharacter) + str;

export const padLinesWithSpaces = (
  amount: number,
  str: string,
  newline: string
): string => {
  const spaces = repeatString(amount, " ");
  return str.replace(new RegExp(`${newline}`, "g"), `${newline}${spaces}`);
};

export const getDeep = <T = unknown>(
  keys: string[],
  obj: unknown
): T | undefined => {
  const [key, ...remainingKeys] = keys;

  if (obj == null) {
    return undefined;
  } else if (key == null) {
    return obj as T;
  }

  return getDeep(remainingKeys, (obj as Record<string, unknown>)[key]);
};

export const setDeep = <T = unknown>(
  obj: Record<string, unknown>,
  keys: string[],
  value: T
): Record<string, unknown> => {
  const [key, ...remainingKeys] = keys;

  if (key == null) {
    throw new Error(
      `Invalid path "${keys}" when setting "${value}" in \`${JSON.stringify(
        obj
      )}\`.`
    );
  } else if (remainingKeys.length === 0) {
    obj[key] = value;
    return obj;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parent = obj as any;
  const child = parent[key] ? parent[key] : {};
  obj[key] = setDeep(child, remainingKeys, value);

  return obj;
};

/**
 * Concatenates parameters with separator, omitting any falsy values.
 */
export const joinWith = (
  separator: string,
  items: Array<string | Falsy>
): string => items.filter(Boolean).join(separator);
