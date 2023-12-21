export const getDeep = <T = unknown>(
  keys: string[],
  obj: unknown,
): T | undefined => {
  const [key, ...remainingKeys] = keys;

  if (obj == null) {
    return undefined;
  } else if (key == null) {
    return obj as T;
  }

  return getDeep(remainingKeys, (obj as Record<string, unknown>)[key]);
};
