import stripAnsi from "strip-ansi";
import { words, padLinesWithSpaces, joinWith, leftpad } from "../utils";
import { formatHeader } from "./formatHeader";
import { Config, Input } from "../types";

export const formatStandardMessage = (input: Input, config: Config) => {
  const headerText = formatHeader(input, config);
  const headerLength = stripAnsi(headerText).length;
  const stackText =
    input.stack &&
    leftpad(4, padLinesWithSpaces(4, input.stack, config.newline));
  const messageText = padLinesWithSpaces(
    headerLength + 1,
    input.msg,
    config.newline
  );
  const result = words(headerText, messageText);

  return joinWith(config.newline, [result, stackText]);
};
