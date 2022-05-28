import { execSync } from "child_process";
import path from "path";

describe("v7+ Transforms", () => {
  it("formats correctly", () => {
    const PATH = path.resolve(__dirname, "./v7+-transports.ts");
    const output = execSync(`ts-node ${PATH}`);
    expect(output.toString()).toMatchInlineSnapshot(`
      "00:00:00 Info: Testing 123...
      "
    `);
  });
});
