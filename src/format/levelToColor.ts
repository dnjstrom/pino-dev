import chalk, { Chalk } from "chalk";

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
