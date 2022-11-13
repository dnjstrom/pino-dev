import { execSync } from "child_process";
import { examples } from "./utils/examples";
import path from "path";
import packageJson from "../package.json";

const BIN_PATH = path.resolve(__dirname, "..", packageJson.bin["pino-dev"]);

const runCli = (input: string, flags = "") =>
  execSync(`FORCE_COLOR=1 ${BIN_PATH} ${flags}`, {
    input,
  }).toString();

describe("cli", () => {
  it("handles all examples correctly", () => {
    const input = examples.join("\n");
    expect(runCli(input)).toMatchInlineSnapshot(`
      "miscellaneous text
      [90m02:56:15 [36mTrace[39m[90m:[39m An info message
      [90m02:56:15 [34mDebug[39m[90m:[39m A debug message
      [90m02:56:15 [32mInfo[39m[90m:[39m An info message
      [90m02:56:15 [33mWarn[39m[90m:[39m A warning message
      [90m02:56:15 [31mError[39m[90m:[39m An error message
      [90m02:56:15 [31m[1mFatal[22m[39m[90m:[39m A fatal message
      [90m02:56:15 [My Logger] [32mInfo[39m[90m:[39m A logger with a name set
      [90m02:56:15 [32mInfo[39m[90m:[39m A logger without the base child logger
      [90m02:56:15 [32mInfo[39m[90m:[39m 	    A message with leading whitespace
      [90m02:56:15 [32mInfo[39m[90m:[39m A message with ending whitespace    	
      [90m02:56:15 [32mInfo[39m[90m:[39m A multi-line message. Lorem ipsum
                     dolor sit amet, consectetur adipiscing elit. Vivamus vitae orci volutpat,
                     finibus augue vitae, pellentesque nibh. Maecenas lacus erat, maximus sit amet ligula sed,
                     porttitor tincidunt felis. Donec dapibus eget est eu fermentum. Sed eu augue turpis.
                     Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
                     Vivamus vehicula ante nisi, id porta odio blandit ut.
      [90m02:56:15 [32mInfo[39m[90m:[39m A message with an object parameter
      [90m02:56:15 [31mError[39m[90m:[39m An error happened somehow
          Error: Oh noes!
          at /some/path/to/file:23:98
          at step (/some/path/to/file:23:98)
          at Object.next (/some/path/to/file:23:98)
          at /some/path/to/file:23:98
          at new Promise (<anonymous>)
          at __awaiter (/some/path/to/file:23:98)
          at generateExamples (/some/path/to/file:23:98)
          at Object.<anonymous> (/some/path/to/file:23:98)
          at Module._compile (internal/some/path/to/file:23:98)
          at Module.m._compile (/some/path/to/file:23:98)
      [90m02:56:15 [32mInfo[39m[90m:[39m Meta data via child logger
      [90m02:56:15 [32mInfo[39m[90m:[39m something else
      [90m02:56:15 [32mInfo[39m[90m:[39m [36mGET[39m /greet/world [32m200[39m 123ms
      [90m02:56:15 [My Logger > [35mmy-test:namespace[39m[90m] [36mTrace[39m[90m:[39m A debug message
      "
    `);
  });

  it("applies command line flags", () => {
    const input = `{"foo": "hello", "time": 1612899089589}`;
    const flags = `--time-format 'HH:mm:ss' --newline '\r\n' --property-map '{ "msg": "foo" }'`;
    const output = runCli(input, flags);
    expect(output).toMatchInlineSnapshot(`
      "[90m19:31:29:[39m hello
      "
    `);
  });
});
