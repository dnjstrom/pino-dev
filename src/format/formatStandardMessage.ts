import stripAnsi from "strip-ansi";
import { words, padLinesWithSpaces, joinWith } from "../utils";
import { formatHeader } from "./formatHeader";
import { Config, Input } from "../types";

export const formatStandardMessage = (input: Input, config: Config) => {
  const headerText = formatHeader(input, config);
  const headerLength = stripAnsi(headerText).length;
  const stackText =
    input.stack && padLinesWithSpaces(4, input.stack, config.newline);
  const messageText = padLinesWithSpaces(
    headerLength + 1,
    input.msg,
    config.newline
  ).trim();
  const result = words(headerText, messageText);

  return joinWith(config.newline, [result, stackText]);
};
