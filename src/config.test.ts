import { DEFAULT_CONFIG, mergeConfig } from "./config";

describe("mergeConfig", () => {
  it("should merge configs appropriately", () => {
    const merged = mergeConfig(DEFAULT_CONFIG, {
      timeFormat: "HH:mm",
      propertyMap: {
        ns: false,
        "err.stack": "err",
      },
    });

    expect(merged).toMatchInlineSnapshot(`
      Object {
        "newline": "
      ",
        "propertyMap": Object {
          "err.stack": "err",
          "level": "level",
          "msg": "msg",
          "name": "name",
          "ns": false,
          "req.method": "req.method",
          "req.url": "req.url",
          "res.statusCode": "res.statusCode",
          "responseTime": "responseTime",
          "time": "time",
        },
        "timeFormat": "HH:mm",
      }
    `);
  });
});
