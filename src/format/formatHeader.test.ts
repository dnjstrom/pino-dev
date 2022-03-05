import stripAnsi from "strip-ansi";
import { DEFAULT_CONFIG } from "../config";
import { formatHeader } from "./formatHeader";

const time = 1646377816348;

describe("formatHeader", () => {
  it("Handles string timestamps", () => {
    const formatted = formatHeader(
      { msg: "My message", time: "2022-03-04T06:58:41.972Z" },
      DEFAULT_CONFIG
    );
    expect(stripAnsi(formatted)).toMatchInlineSnapshot(
      `"2022-03-04T06:58:41.972Z:"`
    );
  });

  it("Handles number timestamps", () => {
    const formatted = formatHeader(
      { msg: "My message", time: time },
      DEFAULT_CONFIG
    );
    expect(stripAnsi(formatted)).toMatchInlineSnapshot(`"07:10:16:"`);
  });
});
