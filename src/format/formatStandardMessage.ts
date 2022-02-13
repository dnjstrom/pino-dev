import stripAnsi from "strip-ansi";
import { words, padLinesWithSpaces, joinWith, leftPad } from "../utils";
import { formatHeader } from "./formatHeader";
import { Config, Input } from "../types";

export const formatStandardMessage = (input: Input, config: Config): string => {
  const headerText = formatHeader(input, config);
  const headerLength = stripAnsi(headerText).length;
  const stackText =
    input.err?.stack &&
    leftPad(4, padLinesWithSpaces(4, input.err.stack, config.newline));
  const messageText = padLinesWithSpaces(
    headerLength + 1,
    input.msg,
    config.newline
  );
  const result = words(headerText, messageText);

  return joinWith(config.newline, [result, stackText]);
};
