process.env.FORCE_COLOR = "0";

import pino from "pino";
import { prettifierFactory as pinoDev } from "../src/index";
import { ListDestination } from "./utils/ListDestination";
import MockDate from "mockdate";

MockDate.set("2020");

describe("Programmatic usage", () => {
  let destination: ListDestination;
  let logger: pino.Logger;

  beforeEach(() => {
    destination = new ListDestination();
    logger = pino(
      { level: "trace", prettyPrint: { colorize: false }, prettifier: pinoDev },
      destination
    );
  });

  it("Formats correctly", () => {
    logger.info("Testing 123...");
    expect(destination.getOutput().map((log) => JSON.stringify(log)))
      .toMatchInlineSnapshot(`
      Array [
        "\\"01:00:00 Info: Testing 123...\\\\n\\"",
      ]
    `);
  });
});
