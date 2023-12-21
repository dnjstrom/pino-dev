/**
 * Concatenates parameters with separator, omitting any falsy values.
 */

export const joinWith = (
  separator: string,
  items: Array<string | Falsy>,
): string => items.filter(Boolean).join(separator);
