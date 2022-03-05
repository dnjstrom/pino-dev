import { format } from "date-fns";
import { levelToColor } from "./levelToColor";
import { levelToString } from "./levelToString";
import { joinWith } from "../utils/joinWith";
import { Input } from "../parse/Input";
import { Config } from "../config";
import { getChalk } from "./getChalk";

export const formatHeader = (input: Input, config: Config): string => {
  const chalk = getChalk(config);
  const timeText =
    typeof input.time === "number"
      ? format(input.time, config.timeFormat)
      : input.time;

  const labels = [input.name, input.ns && chalk.magenta(input.ns)].filter(
    Boolean
  );
  const labelsText = labels.length > 0 && `[${labels.join(" > ")}]`;
  const levelText =
    input.level &&
    levelToColor(input.level, config)(levelToString(input.level));

  const headerText = joinWith(" ", [timeText, labelsText, levelText]);

  return headerText && chalk.grey(headerText + ":");
};
