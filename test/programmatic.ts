process.env.FORCE_COLOR = "0";

import pino from "pino";
import { prettifierFactory as pinoDev } from "../src/index";
import { WriteMemory } from "./utils/WriteMemory";
import MockDate from "mockdate";

MockDate.set("2020");

const stream = new WriteMemory();

const logger = pino(
  { level: "trace", prettyPrint: { colorize: false }, prettifier: pinoDev },
  stream
);

describe("Programmatic usage", () => {
  beforeEach(() => {
    stream.reset();
  });

  it("Formats correctly", () => {
    logger.info("Testing 123...");
    expect(stream.buffer).toMatchInlineSnapshot(`
      "01:00:00.000 Info: Testing 123...
      "
    `);
  });
});
