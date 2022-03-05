import { execSync } from "child_process";
import { examples } from "./utils/examples";
import * as path from "path";

const binPath = path.resolve(__dirname, "../src/bin.ts");

const runCli = (input: string, flags = "") =>
  execSync(`FORCE_COLOR=0 node -r @swc-node/register ${binPath} ${flags}`, {
    input,
  }).toString();

describe("cli", () => {
  it("handles all examples correctly", () => {
    const input = examples.join("\n");
    expect(runCli(input)).toMatchSnapshot();
  });

  it("applies command line flags", () => {
    const input = `{"foo": "hello", "time": 1612899089589}`;
    const flags = `--time-format 'HH:mm:ss' --newline '\r\n' --property-map '{ "msg": "foo" }'`;
    const output = runCli(input, flags);
    expect(output).toMatchInlineSnapshot(`
      "19:31:29: hello
      "
    `);
  });
});
