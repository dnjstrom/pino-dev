#!/usr/bin/env node

// eslint-disable-next-line node/shebang
import fs from "fs";
import pump from "pump";
import split from "split2";
import { Transform } from "readable-stream";
import { prettifierFactory } from "./index";
import args from "args";
import { parse } from "@hapi/bourne";
import { debug } from "./debug";
import type { Config } from "./config";
import type { PartialDeep } from "type-fest";

args
  .option(
    ["m", "property-map"],
    "Map arbitrary incoming properties to semantic pino-dev properties using json.",
  )
  .option(
    ["t", "time-format"],
    "The time format to use (syntax according to https://www.npmjs.com/package/date-fns).",
  )
  .option(
    ["n", "newline"],
    `The newline character used in prettified output. Either "\\n" (default) or "\\r\\n".`,
  )
  .option(["-", "color"], "Force color.")
  .option(["-", "no-color"], "Force no color.");

const options: Record<string, string> = args.parse(process.argv);
const parsedPropertyMap = (() => {
  const propertyMapString = options["propertyMap"];

  if (!propertyMapString) {
    return;
  }

  const propertyMap = parse(propertyMapString, {
    protoAction: "remove",
  });

  return { propertyMap, m: propertyMap };
})();

const parsedOptions: PartialDeep<Config> = {
  ...options,
  ...parsedPropertyMap,
};

debug(
  `pino-dev started with options: ${JSON.stringify(parsedOptions, null, 2)}`,
);

const prettify = prettifierFactory(parsedOptions);

const prettificationTransform = new Transform({
  transform(chunk: Buffer, _enc, cb) {
    const line = prettify(chunk.toString());

    if (line === undefined) {
      return cb();
    }

    cb(undefined, line);
  },
});

pump(
  process.stdin,
  split(), // Split chunks on newlines
  prettificationTransform, // prettify each chunk
  process.stdout,
);

// https://github.com/pinojs/pino/pull/358
if (!process.stdin.isTTY && !fs.fstatSync(process.stdin.fd).isFile()) {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  process.once("SIGINT", () => {});
}
