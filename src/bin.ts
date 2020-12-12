#!/usr/bin/env node

import fs from "fs";
import pump from "pump";
import split from "split2";
import { Transform } from "readable-stream";
import { prettifierFactory } from "./index";
import args from "args";
import bourne from "@hapi/bourne";
import { debug } from "./debug";

args
  .option(
    ["m", "property-map"],
    "Map arbitrary incoming properties to semantic pino-dev properties using json."
  )
  .option("color", "Force color.")
  .option("no-color", "Force no color.")
  .option(
    ["t", "time-format"],
    "The time format to use (syntax according to https://www.npmjs.com/package/date-fns)."
  )
  .option(
    ["n", "newline"],
    `The newline character used in prettified output. Either "\\n" (default) or "\\r\\n".`
  );

const opts = args.parse(process.argv);
debug(`pino-dev started with options: ${JSON.stringify(opts, null, 2)}`);

const propertyMap = opts.map
  ? bourne.parse(opts.map, { protoAction: "remove" })
  : undefined;

const prettify = prettifierFactory({ propertyMap });
const prettyTransport = new Transform({
  objectMode: true,
  transform(chunk, enc, cb) {
    const line = prettify(chunk.toString());
    if (line === undefined) {
      return cb();
    }
    cb(undefined, line);
  },
});

pump(process.stdin, split(), prettyTransport, process.stdout);

// https://github.com/pinojs/pino/pull/358
if (!process.stdin.isTTY && !fs.fstatSync(process.stdin.fd).isFile()) {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  process.once("SIGINT", () => {});
}
