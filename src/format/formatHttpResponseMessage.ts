import chalk from "chalk";
import { statusCodeToColor } from "../conversions";
import { formatHeader } from "./formatHeader";
import { joinWith } from "../utils/joinWith";
import { Config, Input } from "../types";

export const formatHttpResponseMessage = (
  input: Input,
  config: Config
): string => {
  const headerText = formatHeader(input, config);
  const methodText = input.req?.method && chalk.cyan(input.req.method);
  const statusText =
    input.res?.statusCode &&
    statusCodeToColor(input.res.statusCode)(String(input.res.statusCode));
  const responseTimeText = input.responseTime && `${input.responseTime}ms`;

  return joinWith(" ", [
    headerText,
    methodText,
    input.req?.url,
    statusText,
    responseTimeText,
  ]);
};
