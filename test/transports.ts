import { pino } from "pino";
import MockDate from "mockdate";
import packageJson from "../package.json";
import path from "path";

const MAIN_PATH = path.resolve(__dirname, "..", packageJson.main);

MockDate.set("2020");

const transport = pino.transport({
  target: MAIN_PATH,
  options: {
    colorize: "false",
  },
});

const logger = pino(transport);

logger.info("Testing 123...");
