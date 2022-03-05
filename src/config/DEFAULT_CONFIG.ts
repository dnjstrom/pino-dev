import { Config } from ".";

export const DEFAULT_CONFIG: Config = {
  newline: "\n",
  timeFormat: "HH:mm:ss",
  propertyMap: {
    msg: "msg",
    level: "level",
    ns: "ns",
    name: "name",
    "err.stack": "err.stack",
    time: "time",
    "req.method": "req.method",
    "req.url": "req.url",
    "res.statusCode": "res.statusCode",
    responseTime: "responseTime",
  },
};
