#!/usr/bin/env ts-node

// eslint-disable-next-line node/shebang
import pinoDebug from "pino-debug";
import debugFactory from "debug";
import { pino } from "pino";

const logger = pino({ name: "My Logger", level: "trace" });
pinoDebug(logger, { map: { "*": "trace" } });

const debug = debugFactory("my-test:namespace");

debug("A debug message");
