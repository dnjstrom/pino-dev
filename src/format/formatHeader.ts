import { format } from "date-fns";
import chalk from "chalk";
import { levelToColor, levelToString } from "../conversions";
import { words } from "../utils";
import { Config, Input } from "../types";

export const formatHeader = (input: Input, config: Config) => {
  const timeText = format(input.time, config.timeFormat);

  const labels = [input.name, input.ns && chalk.magenta(input.ns)].filter(
    Boolean
  );
  const labelsText = labels.length > 0 && `[${labels.join(" > ")}]`;

  return chalk.grey(
    words(
      timeText,
      labelsText,
      levelToColor(input.level)(levelToString(input.level))
    ) + ":"
  );
};
