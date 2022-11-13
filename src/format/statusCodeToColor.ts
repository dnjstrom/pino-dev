import type { Chalk } from "chalk";
import type { Config } from "../config";
import { getChalk } from "./getChalk";

export const statusCodeToColor = (
  statusCode: number,
  config: Config
): Chalk => {
  const chalk = getChalk(config);

  if (statusCode >= 500 && statusCode <= 599) {
    return chalk.red;
  } else if (statusCode >= 400 && statusCode <= 499) {
    return chalk.yellow;
  } else if (statusCode >= 300 && statusCode <= 399) {
    return chalk.blue;
  } else if (statusCode >= 200 && statusCode <= 299) {
    return chalk.green;
  } else {
    return chalk.magenta;
  }
};
