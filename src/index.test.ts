import { prettifierFactory } from ".";
import { examples } from "../test/utils/examples";

describe("formatting examples", () => {
  it(`formats all examples correctly`, () => {
    const prettifier = prettifierFactory({
      colorize: false,
    });
    expect(examples.map(prettifier).join("")).toMatchInlineSnapshot(`
      "miscellaneous text
      02:56:15 Trace: An info message
      02:56:15 Debug: A debug message
      02:56:15 Info: An info message
      02:56:15 Warn: A warning message
      02:56:15 Error: An error message
      02:56:15 Fatal: A fatal message
      02:56:15 [My Logger] Info: A logger with a name set
      02:56:15 Info: A logger without the base child logger
      02:56:15 Info: 	    A message with leading whitespace
      02:56:15 Info: A message with ending whitespace    	
      02:56:15 Info: A multi-line message. Lorem ipsum
                     dolor sit amet, consectetur adipiscing elit. Vivamus vitae orci volutpat,
                     finibus augue vitae, pellentesque nibh. Maecenas lacus erat, maximus sit amet ligula sed,
                     porttitor tincidunt felis. Donec dapibus eget est eu fermentum. Sed eu augue turpis.
                     Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
                     Vivamus vehicula ante nisi, id porta odio blandit ut.
      02:56:15 Info: A message with an object parameter
      02:56:15 Error: An error happened somehow
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
      02:56:15 Info: Meta data via child logger
      02:56:15 Info: something else
      02:56:15 Info: GET /greet/world 200 123ms
      02:56:15 [My Logger > my-test:namespace] Trace: A debug message

      "
    `);
  });
});
