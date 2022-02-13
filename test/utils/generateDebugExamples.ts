#!/usr/bin/env ts-node

import pinoDebug from "pino-debug";
import debugFactory from "debug";
import pino from "pino";

const logger = pino({ level: "trace" });
pinoDebug(logger, { map: { "*": "trace" } });

const debug = debugFactory("my-test:namespace");

debug("A debug message");
