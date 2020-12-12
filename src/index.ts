import bourne from "@hapi/bourne";
import { debug } from "./debug";
import { getDeep, setDeep } from "./utils";
import { format } from "./format";
import { config, mergeConfig } from "./config";
import { Config, Input, PropertyMap } from "./types";

const mapProperties = (propertyMap: PropertyMap, input: any): any =>
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

const parseInput = (propertyMap: PropertyMap, input: string): Input => {
  const parsed = bourne.parse(input, { protoAction: "remove" });
  const mapped = mapProperties(propertyMap, parsed);

  if (mapped.msg == null) {
    throw new Error("Input is missing `msg`-property");
  }

  return mapped;
};

export const prettifierFactory = (options?: Partial<Config>) => {
  const opts = options ? mergeConfig(config, options) : config;

  debug(`Using config ${JSON.stringify(opts, null, 2)}.`);

  return (line: string) => {
    let input: Input;
    try {
      input = parseInput(opts.propertyMap, line);
    } catch (err) {
      debug(`Error parsing input \`${line}\`.`);
      debug(err);
      return line + config.newline;
    }

    return format(input, opts) + config.newline;
  };
};
