import JoyCon from "joycon";
import bourne from "@hapi/bourne";
import { debug } from "./debug";
import { Config } from "./types";

const joycon = new JoyCon({
  files: ["package.json", "pino-dev.config.json", "pino-dev.config.js"],
  packageKey: "pino-dev",
  parseJSON: (str) => bourne.parse(str, { protoAction: "remove" }),
});

const { path, data: configFileData } = joycon.loadSync();

if (path) {
  debug(`Using config from ${path}.`);
}

const defaultConfig: Config = {
  newline: "\n",
  timeFormat: "HH:mm:ss.SSS",
  propertyMap: {
    msg: "msg",
    level: "level",
    ns: "ns",
    name: "name",
    stack: "stack",
    time: "time",
    "req.method": "req.method",
    "req.url": "req.url",
    "res.statusCode": "res.statusCode",
    responseTime: "responseTime",
  },
};

export const mergeConfig = (
  base: Config,
  ...additionalConfigs: Array<Partial<Config>>
): Config =>
  additionalConfigs.reduce<Config>((agg, config) => {
    return {
      ...agg,
      ...config,
      propertyMap: {
        ...agg.propertyMap,
        ...config.propertyMap,
      },
    };
  }, base);

export const config = configFileData
  ? mergeConfig(defaultConfig, configFileData)
  : defaultConfig;
