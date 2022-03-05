import stripAnsi from "strip-ansi";
import { joinWith } from "../utils/joinWith";
import { padLinesWithSpaces } from "../utils/padLinesWithSpaces";
import { leftPad } from "../utils/leftPad";
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
  const result = joinWith(" ", [headerText, messageText]);

  return joinWith(config.newline, [result, stackText]);
};
