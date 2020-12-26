import bourne from "@hapi/bourne";
import { debug } from "./debug";
import { getDeep, setDeep } from "./utils";
import { format } from "./format";
import { config, mergeConfig } from "./config";
import { Config, Input, PropertyMap } from "./types";

const mapProperties = (
  propertyMap: PropertyMap,
  input: Record<string, unknown>
): Record<string, unknown> =>
  Object.entries(propertyMap).reduce((agg, [to, from]) => {
    if (typeof from === "boolean" && !from) {
      return agg;
    } else if (typeof from !== "string") {
      throw new Error(
        `Invalid property mapping for "${to}": ${JSON.stringify(from)}.`
      );
    }

    const value = getDeep(from.split("."), input);

    if (value !== undefined) {
      setDeep(agg, to.split("."), value);
    }

    return agg;
  }, {});

const validateInput = (
  propertyMap: PropertyMap,
  input: Record<string, unknown>
): Input => {
  const mapped = mapProperties(propertyMap, input);

  if (mapped.msg == null) {
    throw new Error("Input is missing `msg`-property");
  }

  return mapped as Input;
};

export const prettifierFactory = (
  options?: Partial<Config>
): ((line: unknown) => string) => {
  const opts = options ? mergeConfig(config, options) : config;

  debug(`Using config ${JSON.stringify(opts, null, 2)}.`);

  return (line: unknown) => {
    let input: Input;

    try {
      const parsed =
        typeof line === "string"
          ? bourne.parse(line, { protoAction: "remove" })
          : line;

      input = validateInput(opts.propertyMap, parsed);
    } catch (err) {
      debug(`Error parsing input \`${line}\`.`);
      debug(err);
      return line + config.newline;
    }

    return format(input, opts) + config.newline;
  };
};
