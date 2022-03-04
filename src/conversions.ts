import chalk, { Chalk } from "chalk";

export const levelToString = (level: number): string => {
  switch (level) {
    case 60:
      return "Fatal";
    case 50:
      return "Error";
    case 40:
      return "Warn";
    case 30:
      return "Info";
    case 20:
      return "Debug";
    case 10:
      return "Trace";
    default:
      return "Unknown";
  }
};

export const levelToColor = (level: number): Chalk => {
  switch (level) {
    case 60:
      return chalk.red.bold;
    case 50:
      return chalk.red;
    case 40:
      return chalk.yellow;
    case 30:
      return chalk.green;
    case 20:
      return chalk.blue;
    case 10:
      return chalk.cyan;
    default:
      return chalk.reset;
  }
};

export const statusCodeToColor = (statusCode: number): Chalk => {
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
