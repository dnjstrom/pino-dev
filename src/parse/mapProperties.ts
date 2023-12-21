import { getDeep } from "../utils/getDeep";
import { setDeep } from "../utils/setDeep";
import type { Input } from "./Input";
import type { PropertyMap } from "./PropertyMap";

export const mapProperties = (
  propertyMap: PropertyMap,
  input: Record<string, unknown>,
): Input => {
  const mapped: Partial<Input> = Object.entries(propertyMap).reduce(
    (agg, [to, from]) => {
      if (from === false) {
        return agg; // Ignore the property if set to false
      } else if (typeof from !== "string") {
        throw new Error(`Invalid property mapping for "${to}": "${from}".`);
      }

      const value = getDeep(from.split("."), input);

      if (value !== undefined) {
        setDeep(agg, to.split("."), value);
      }

      return agg;
    },
    {},
  );

  if (mapped.msg == null) {
    throw new Error("Input is missing `msg`-property");
  }

  return mapped as Input;
};
