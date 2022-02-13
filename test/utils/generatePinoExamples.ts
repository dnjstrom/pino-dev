#!/usr/bin/env ts-node

import pino from "pino";

const logger = pino({
  level: "trace",
});

export const generateExamples = async (): Promise<void> => {
  logger.trace("An info message");
  logger.debug("A debug message");
  logger.info("An info message");
  logger.warn("A warning message");
  logger.error("An error message");
  logger.fatal("A fatal message");
  logger.info("\t    A message with leading whitespace");
  logger.info("A message with ending whitespace    \t");
  logger.info(`A multi-line message. Lorem ipsum
  dolor sit amet, consectetur adipiscing elit. Vivamus vitae orci volutpat,
  finibus augue vitae, pellentesque nibh. Maecenas lacus erat, maximus sit amet ligula sed,
  porttitor tincidunt felis. Donec dapibus eget est eu fermentum. Sed eu augue turpis.
  Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
  Vivamus vehicula ante nisi, id porta odio blandit ut.`);
  logger.info({ foo: "bar", baz: 42 }, "A message with an object parameter");
  logger.error(new Error("Oh noes!"), "An error happened somehow");

  logger
    .child({ context: { server: "skynet" } })
    .info("Meta data via child logger");

  pino({
    name: "My Logger",
  }).info("A logger with a name set");

  pino({
    base: undefined,
  }).info("A logger without the base child logger");
};

generateExamples()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
