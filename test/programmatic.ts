import { pino } from "pino";
import MockDate from "mockdate";
import packageJson from "../package.json";
import path from "path";

const main = async () => {
  const MAIN_PATH = path.resolve(__dirname, "..", packageJson.main);
  MockDate.set("2020");

  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  const pinoDev = (await import(MAIN_PATH)).prettifierFactory;

  const logger = pino({
    level: "trace",
    prettyPrint: { colorize: false },
    prettifier: pinoDev,
  });

  logger.info("Testing 123...");
};

main();
