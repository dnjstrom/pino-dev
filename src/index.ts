import { parse } from "@hapi/bourne";
import { debug } from "./debug";
import { format } from "./format";
import { config, Config } from "./config";
import { mergeConfig } from "./config/mergeConfig";
import type { Input } from "./parse/Input";
import type { PartialDeep } from "type-fest";
import { mapProperties } from "./parse/mapProperties";
import abstractTransport, { OnUnknown } from "pino-abstract-transport";
import { Transform } from "stream";
import pump from "pump";
import { SonicBoom } from "sonic-boom";

export const prettifierFactory = (
  options: PartialDeep<Config> = {},
): ((line: string | unknown) => string) => {
  const opts = mergeConfig(config, options);

  debug(`Using config ${JSON.stringify(opts, null, 2)}.`);

  // `line` is a string most of the time, but can be an object when used programmatically.
  return (line: string | unknown) => {
    let input: Input;

    try {
      const parsed =
        typeof line === "string"
          ? parse(line, { protoAction: "remove" })
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

const build = async (
  options?: PartialDeep<Config>,
): Promise<Transform & OnUnknown> => {
  const opts = mergeConfig(config, options ?? {});
  const pretty = prettifierFactory(opts);

  return abstractTransport(
    (source) => {
      const prettify = new Transform({
        objectMode: true,
        autoDestroy: true,
        transform(chunk, _enc, cb) {
          const line = pretty(chunk);
          cb(null, line);
        },
      });

      const destination = new SonicBoom({ dest: 1, sync: false });

      source.on("unknown", function (line) {
        process.stdout.write(line + config.newline);
      });

      // @ts-expect-error SonicBoom is typed to not be writable, but is.
      pump(source, prettify, destination);
    },
    {
      parse: "lines",
    },
  );
};

export default build;
