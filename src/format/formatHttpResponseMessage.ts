import { statusCodeToColor } from "./statusCodeToColor";
import { formatHeader } from "./formatHeader";
import { joinWith } from "../utils/joinWith";
import type { Input } from "../parse/Input";
import type { Config } from "../config";
import { getChalk } from "./getChalk";

export const formatHttpResponseMessage = (
  input: Input,
  config: Config,
): string => {
  const chalk = getChalk(config);
  const headerText = formatHeader(input, config);
  const methodText = input.req?.method && chalk.cyan(input.req.method);
  const statusText =
    input.res?.statusCode &&
    statusCodeToColor(
      input.res.statusCode,
      config,
    )(String(input.res.statusCode));
  const responseTimeText = input.responseTime && `${input.responseTime}ms`;

  return joinWith(" ", [
    headerText,
    methodText,
    input.req?.url,
    statusText,
    responseTimeText,
  ]);
};
