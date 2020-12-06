#!/usr/bin/env node

import fs from "fs";
import pump from "pump";
import split from "split2";
import { Transform } from "readable-stream";
import { prettifierFactory } from "./index";

const prettify = prettifierFactory();
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

const join = new Transform({
  objectMode: true,
  transform(
    chunk: any,
    encoding: BufferEncoding,
    callback: (error?: Error, data?: any) => void
  ) {
    callback(undefined, chunk.toString() + "\n");
  },
});

pump(process.stdin, split(), prettyTransport, join, process.stdout);

// https://github.com/pinojs/pino/pull/358
if (!process.stdin.isTTY && !fs.fstatSync(process.stdin.fd).isFile()) {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  process.once("SIGINT", () => {});
}
