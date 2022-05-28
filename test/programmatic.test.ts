import { execSync } from "child_process";
import path from "path";

describe("Programmatic usage", () => {
  it("formats correctly", () => {
    const PATH = path.resolve(__dirname, "./programmatic.ts");
    const output = execSync(`ts-node ${PATH}`);
    expect(output.toString()).toMatchInlineSnapshot(`
      "00:00:00 Info: Testing 123...
      "
    `);
  });
});
