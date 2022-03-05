import bourne from "@hapi/bourne";
import { debug } from "./debug";
import { getDeep } from "./utils/getDeep";
import { setDeep } from "./utils/setDeep";
import { format } from "./format";
import { config } from "./config";
import { mergeConfig } from "./config/mergeConfig";
import { Config, Input, PropertyMap } from "./types";
import { PartialDeep } from "type-fest";

const mapProperties = (
  propertyMap: PropertyMap,
  input: Record<string, unknown>
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
    {}
  );

  if (mapped.msg == null) {
    throw new Error("Input is missing `msg`-property");
  }

  return mapped as Input;
};

export const prettifierFactory = (
  options: PartialDeep<Config> = {}
): ((line: string | unknown) => string) => {
  const opts = mergeConfig(config, options);

  debug(`Using config ${JSON.stringify(opts, null, 2)}.`);

  // `line` is a string most of the time, but can be an object when used programmatically.
  return (line: string | unknown) => {
    let input: Input;

    try {
      const parsed =
        typeof line === "string"
          ? bourne.parse(line, { protoAction: "remove" })
          : line;
      input = mapProperties(opts.propertyMap, parsed);
    } catch (err) {
      debug(`Error parsing input \`${line}\`.`);
      debug(err);
      return line + config.newline;
    }

    return format(input, opts) + config.newline;
  };
};
