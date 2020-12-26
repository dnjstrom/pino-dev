const repeatString = (amount: number, str: string) =>
  new Array(amount + 1).join(" ");

export const leftpad = (amount: number, str: string, padCharacter = " ") =>
  repeatString(amount, padCharacter) + str;

export const padLinesWithSpaces = (
  amount: number,
  str: string,
  newline: string
) => {
  const spaces = repeatString(amount, " ");
  return str.replace(new RegExp(`${newline}`, "g"), `${newline}${spaces}`);
};

export const getDeep = (keys: string[], obj: any): any => {
  const [key, ...remainingKeys] = keys;

  if (obj == null) {
    return undefined;
  } else if (key == null) {
    return obj;
  }

  return getDeep(remainingKeys, obj[key]);
};

export const setDeep = (obj: any = {}, keys: string[], value: any): any => {
  const [key, ...remainingKeys] = keys;

  if (key == null) {
    return obj;
  } else if (remainingKeys.length === 0) {
    obj[key] = value;
    return obj;
  }

  obj[key] = setDeep(obj[key] ? obj[key] : {}, remainingKeys, value);

  return obj;
};

export const joinWith = (separator: string, items: unknown[]) =>
  items.filter(Boolean).join(separator);

export const words = (...args: unknown[]) => joinWith(" ", args);
