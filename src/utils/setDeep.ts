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
