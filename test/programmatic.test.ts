import { pino } from "pino";
import { ListDestination } from "./utils/ListDestination";
import MockDate from "mockdate";
import packageJson from "../package.json";
import path from "path";

const MAIN_PATH = path.resolve(__dirname, "..", packageJson.main);

MockDate.set("2020");

describe("Programmatic usage", () => {
  let destination: ListDestination;
  let logger: pino.Logger;

  beforeEach(async () => {
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    const pinoDev = (await import(MAIN_PATH)).default;
    destination = new ListDestination();
    logger = pino(
      { level: "trace", prettyPrint: { colorize: false }, prettifier: pinoDev },
      destination
    );
  });

  it("Formats correctly", () => {
    logger.info("Testing 123...");
    expect(destination.getOutput()).toMatchInlineSnapshot(`
      Array [
        "00:00:00 Info: Testing 123...
      ",
      ]
    `);
  });
});
