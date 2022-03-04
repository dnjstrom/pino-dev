import { format } from "date-fns";
import chalk from "chalk";
import { levelToColor, levelToString } from "../conversions";
import { words } from "../utils";
import { Config, Input } from "../types";

export const formatHeader = (input: Input, config: Config): string => {
  const timeText = input.time && typeof input.time === "number" ? format(input.time, config.timeFormat) : input.time;

  const labels = [input.name, input.ns && chalk.magenta(input.ns)].filter(
    Boolean
  );
  const labelsText = labels.length > 0 && `[${labels.join(" > ")}]`;
  const levelText =
    input.level && levelToColor(input.level)(levelToString(input.level));

  const headerText = words(timeText, labelsText, levelText);

  return headerText && chalk.grey(headerText + ":");
};
