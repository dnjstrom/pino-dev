import stripAnsi from "strip-ansi";
import { DEFAULT_CONFIG } from "../config/DEFAULT_CONFIG";
import { formatHttpResponseMessage } from "./formatHttpResponseMessage";

const time = 1646377816348;

describe("formatHttpResponseMessage", () => {
  it("Handles simple messages", () => {
    const formatted = formatHttpResponseMessage(
      {
        msg: "My message",
        time,
      },
      DEFAULT_CONFIG
    );
    expect(stripAnsi(formatted)).toMatchInlineSnapshot(`"07:10:16:"`);
  });

  it("Handles rich messages", () => {
    const formatted = formatHttpResponseMessage(
      {
        msg: "My message",
        time,
        req: { method: "GET", url: "https://example.com/test", headers: {} },
        res: { statusCode: 200 },
        responseTime: 1337,
      },
      DEFAULT_CONFIG
    );
    expect(stripAnsi(formatted)).toMatchInlineSnapshot(
      `"07:10:16: GET https://example.com/test 200 1337ms"`
    );
  });
});
