import pino from "pino";
import { ListDestination } from "./ListDestination";
import request from "supertest";
import http from "http";
import pinoHttp from "pino-http";

const exampleMessagesDestination = new ListDestination();

const logger = pino(exampleMessagesDestination);

export const generateExamples = async (): Promise<unknown[]> => {
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

  const httpLogger = pinoHttp(exampleMessagesDestination);

  await new Promise<void>((resolve, reject) => {
    request(
      http.createServer((req, res) => {
        httpLogger(req, res);
        req.log.info("something else");
        res.end("hello world");
      })
    )
      .get("/greet/world")
      .end((err: Error | undefined) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
  });

  return exampleMessagesDestination.getOutput();
};
