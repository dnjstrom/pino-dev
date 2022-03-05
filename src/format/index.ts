import { formatHttpResponseMessage } from "./formatHttpResponseMessage";
import { formatStandardMessage } from "./formatStandardMessage";
import { Input } from "../parse/Input";
import { Config } from "../config";

export const format = (input: Input, config: Config): string => {
  if (input.req && input.res) {
    return formatHttpResponseMessage(input, config);
  }

  return formatStandardMessage(input, config);
};
