import chalk, { Chalk } from "chalk";
import { Config } from "../config";

export const getChalk = (config: Config): Chalk => {
  switch (config.colorize) {
    case true:
    case "true":
      return new chalk.Instance({ level: 3 });
    case false:
    case "false":
      return new chalk.Instance({ level: 0 });
    case undefined:
      return new chalk.Instance();
    default:
      throw new Error(`Unsupported config.colorize value: ${config.colorize}`);
  }
};
