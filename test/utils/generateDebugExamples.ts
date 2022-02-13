#!/usr/bin/env ts-node

// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./pino-debug.d.ts" />

import pinoDebug from "pino-debug";
import debugFactory from "debug";
import pino from "pino";

const logger = pino({ level: "trace" });

pinoDebug(logger, {
  auto: true,
  map: {
    "*": "trace",
  },
});

const debug = debugFactory("my-test:namespace");

debug("A debug message");
