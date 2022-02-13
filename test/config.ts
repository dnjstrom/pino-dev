import { mergeConfig, DEFAULT_CONFIG } from "../src/config";

describe("mergeConfig", () => {
  it("Merges configs correctly", () => {
    const merged = mergeConfig(DEFAULT_CONFIG, {
      timeFormat: "HH:mm:ss",
      propertyMap: {
        level: "severity",
      },
    });

    expect(merged).toMatchInlineSnapshot(`
      Object {
        "newline": "
      ",
        "propertyMap": Object {
          "err.stack": "err.stack",
          "level": "severity",
          "msg": "msg",
          "name": "name",
          "ns": "ns",
          "req.method": "req.method",
          "req.url": "req.url",
          "res.statusCode": "res.statusCode",
          "responseTime": "responseTime",
          "time": "time",
        },
        "timeFormat": "HH:mm:ss",
      }
    `);
  });
});
