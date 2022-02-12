import { Writable } from "readable-stream";

import pino from "pino";

// A set of example pino logs generated with the pino library to ensure compatibility across version changes.
const exampleMessages: unknown[] = [];

const time = new Date("1969-07-21 02:56:15").getTime();

// A writeable stream that parses each log message and stores it in exampleMessages.
const exampleMessagesDestination = new Writable({
  write(chunk, _enc, done) {
    const log = JSON.parse(chunk.toString());

    // Make pid static to avoid breaking snapshots.
    if (log.pid !== undefined) {
      log.pid = 12345;
    }

    // Make time static to avoid breaking snapshots.
    if (log.time !== undefined) {
      log.time = time;
    }

    // Make hostname static to avoid breaking snapshots.
    if (log.hostname !== undefined) {
      log.hostname = "my-computer";
    }

    exampleMessages.push(log);
    done();
  },
});

const logger = pino(exampleMessagesDestination);

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

pino(
  {
    name: "My Logger",
  },
  exampleMessagesDestination
).info("A logger with a name set");

pino(
  {
    base: undefined,
  },
  exampleMessagesDestination
).info("A logger without the base child logger");

export const examples = exampleMessages;
