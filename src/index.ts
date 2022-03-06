import bourne from "@hapi/bourne";
import { debug } from "./debug";
import { format } from "./format";
import { config, Config } from "./config";
import { mergeConfig } from "./config/mergeConfig";
import { Input } from "./parse/Input";
import { PartialDeep } from "type-fest";
import { mapProperties } from "./parse/mapProperties";

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

export default prettifierFactory;
