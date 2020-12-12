import { execSync } from "child_process";
import { examples } from "./utils/examples";
import { joinWith } from "../src/utils";
import * as path from "path";

const input = joinWith(
  "\n",
  examples.map((json) => JSON.stringify(json))
);
const binPath = path.resolve(__dirname, "../src/bin.ts");

describe("cli", () => {
  it("handles all examples correctly", () => {
    const output = execSync(
      `echo '${input}' | env FORCE_COLOR=0 ts-node ${binPath}`
    ).toString();
    expect(output).toMatchSnapshot();
  });
});
