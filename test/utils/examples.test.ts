import { examples } from "./examples";

describe("Examples", () => {
  it("should be stable", () => {
    expect(examples).toMatchInlineSnapshot(`
      [
        "miscellaneous text",
        "{"level":10,"time":-14159025000,"pid":12345,"hostname":"localhost","msg":"An info message"}",
        "{"level":20,"time":-14159025000,"pid":12345,"hostname":"localhost","msg":"A debug message"}",
        "{"level":30,"time":-14159025000,"pid":12345,"hostname":"localhost","msg":"An info message"}",
        "{"level":40,"time":-14159025000,"pid":12345,"hostname":"localhost","msg":"A warning message"}",
        "{"level":50,"time":-14159025000,"pid":12345,"hostname":"localhost","msg":"An error message"}",
        "{"level":60,"time":-14159025000,"pid":12345,"hostname":"localhost","msg":"A fatal message"}",
        "{"level":30,"time":-14159025000,"pid":12345,"hostname":"localhost","msg":"\\t    A message with leading whitespace"}",
        "{"level":30,"time":-14159025000,"pid":12345,"hostname":"localhost","msg":"A message with ending whitespace    \\t"}",
        "{"level":30,"time":-14159025000,"pid":12345,"hostname":"localhost","msg":"A multi-line message. Lorem ipsum\\ndolor sit amet, consectetur adipiscing elit. Vivamus vitae orci volutpat,\\nfinibus augue vitae, pellentesque nibh. Maecenas lacus erat, maximus sit amet ligula sed,\\nporttitor tincidunt felis. Donec dapibus eget est eu fermentum. Sed eu augue turpis.\\nVestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;\\nVivamus vehicula ante nisi, id porta odio blandit ut."}",
        "{"level":30,"time":-14159025000,"pid":12345,"hostname":"localhost","foo":"bar","baz":42,"msg":"A message with an object parameter"}",
        "{"level":50,"time":-14159025000,"pid":12345,"hostname":"localhost","err":{"type":"Error","message":"Oh noes!","stack":"Error: Oh noes!\\nat /some/path/to/file:23:98\\nat step (/some/path/to/file:23:98)\\nat Object.next (/some/path/to/file:23:98)\\nat /some/path/to/file:23:98\\nat new Promise (<anonymous>)\\nat __awaiter (/some/path/to/file:23:98)\\nat generateExamples (/some/path/to/file:23:98)\\nat Object.<anonymous> (/some/path/to/file:23:98)\\nat Module._compile (internal/some/path/to/file:23:98)\\nat Module.m._compile (/some/path/to/file:23:98)"},"msg":"An error happened somehow"}",
        "{"level":30,"time":-14159025000,"pid":12345,"hostname":"localhost","context":{"server":"skynet"},"msg":"Meta data via child logger"}",
        "{"level":30,"time":-14159025000,"pid":12345,"hostname":"localhost","name":"My Logger","msg":"A logger with a name set"}",
        "{"level":30,"time":-14159025000,"msg":"A logger without the base child logger"}",
        "{"level":30,"time":-14159025000,"pid":12345,"hostname":"localhost","req":{"id":1,"method":"GET","url":"/greet/world","headers":{"host":"127.0.0.1:12345","accept-encoding":"gzip, deflate","connection":"close"},"remoteAddress":"::ffff:127.0.0.1","remotePort":12345},"msg":"something else"}",
        "{"level":30,"time":-14159025000,"pid":12345,"hostname":"localhost","req":{"id":1,"method":"GET","url":"/greet/world","headers":{"host":"127.0.0.1:12345","accept-encoding":"gzip, deflate","connection":"close"},"remoteAddress":"::ffff:127.0.0.1","remotePort":12345},"res":{"statusCode":200,"headers":{}},"responseTime":123,"msg":"request completed"}",
        "{"level":10,"time":-14159025000,"pid":12345,"hostname":"localhost","name":"My Logger","ns":"my-test:namespace","msg":"A debug message"}",
        "",
      ]
    `);
  });
});
