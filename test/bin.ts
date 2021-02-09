import { execSync } from "child_process";
import { examples } from "./utils/examples";
import { joinWith } from "../src/utils";
import * as path from "path";

const input = joinWith(
  "\n",
  examples.map((json) => JSON.stringify(json))
);

const binPath = path.resolve(__dirname, "../src/bin.ts");

const runCli = (input: string, flags = "") =>
  execSync(
    `echo '${input}' | env FORCE_COLOR=0 ts-node ${binPath} ${flags}`
  ).toString();

describe("cli", () => {
  it("handles all examples correctly", () => {
    expect(runCli(input)).toMatchSnapshot();
  });

  it("applies command line flags", () => {
    const input = `{"foo": "hello", "time": 1612899089589}`;
    const flags = `--time-format 'HH:mm:ss' --newline '\r\n' --property-map '{ "msg": "foo" }'`;
    const output = runCli(input, flags);
    expect(output).toMatchInlineSnapshot(`
      "20:31:29: hello
      "
    `);
  });
});
