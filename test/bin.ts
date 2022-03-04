import { execSync } from "child_process";
import { examples } from "./utils/examples";
import * as path from "path";

const binPath = path.resolve(__dirname, "../src/bin.ts");
const tsNodePath = path.resolve(__dirname, "../node_modules/.bin/ts-node");

const runCli = (input: string, flags = "") =>
  execSync(
    `echo '${input}' | FORCE_COLOR=0 ${tsNodePath} ${binPath} ${flags}`
  ).toString();

describe("cli", () => {
  let input = "";

  beforeAll(async () => {
    input = examples.map((json) => JSON.stringify(json)).join("\n");
  });

  it("handles all examples correctly", () => {
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
