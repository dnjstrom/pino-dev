#!/usr/bin/env ts-node

// eslint-disable-next-line node/shebang
import { pino } from "pino";

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
  logger.info(
    "A multi-line message. Lorem ipsum\ndolor sit amet, consectetur adipiscing elit. Vivamus vitae orci volutpat,\nfinibus augue vitae, pellentesque nibh. Maecenas lacus erat, maximus sit amet ligula sed,\nporttitor tincidunt felis. Donec dapibus eget est eu fermentum. Sed eu augue turpis.\nVestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;\nVivamus vehicula ante nisi, id porta odio blandit ut.",
  );
  logger.info({ foo: "bar", baz: 42 }, "A message with an object parameter");
  logger.error(new Error("Oh noes!"), "An error happened somehow");

  logger
    .child({ context: { server: "skynet" } })
    .info("Meta data via child logger");

  pino({
    name: "My Logger",
  }).info("A logger with a name set");

  pino({}).info("A logger without the base child logger");
};

generateExamples().catch(console.error);
