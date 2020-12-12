import { formatHttpResponseMessage } from "./formatHttpResponseMessage";
import { formatStandardMessage } from "./formatStandardMessage";
import { Config, Input } from "../types";

export const format = (input: Input, config: Config) => {
  if (input.req && input.res) {
    return formatHttpResponseMessage(input, config);
  }

  return formatStandardMessage(input, config);
};
