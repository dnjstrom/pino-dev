import JoyCon from "joycon";
import { parse } from "@hapi/bourne";
import { debug } from "../debug";
import { PartialDeep } from "type-fest";
import { DEFAULT_CONFIG } from "./DEFAULT_CONFIG";
import { mergeConfig } from "./mergeConfig";
import { PropertyMap } from "../parse/PropertyMap";

export type Config = {
  newline: string;
  timeFormat: string;
  propertyMap: PropertyMap;
  colorize?: boolean | "true" | "false";
};

const joycon = new JoyCon({
  files: ["package.json", "pino-dev.config.json", "pino-dev.config.js"],
  packageKey: "pino-dev",
  parseJSON: (str) => parse(str, { protoAction: "remove" }),
});

const { path, data } = joycon.loadSync();
const configFileData: PartialDeep<Config> = data ?? {};

if (path) {
  debug(`Using config from ${path}.`);
}

export const config = mergeConfig(DEFAULT_CONFIG, configFileData);
