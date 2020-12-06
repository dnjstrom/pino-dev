import bourne from "@hapi/bourne";
import chalk from "chalk";
import stripAnsi from "strip-ansi";
import { format } from "date-fns";
import { debug } from "./debug";

const levelToString = (level: number): string => {
  switch (level) {
    case 60:
      return "Fatal";
    case 50:
      return "Error";
    case 40:
      return "Warn";
    case 30:
      return "Info";
    case 20:
      return "Debug";
    case 10:
      return "Trace";
    default:
      return "Unknown";
  }
};

const levelToColor = (level: number) => {
  switch (level) {
    case 60:
      return chalk.red.bold;
    case 50:
      return chalk.red;
    case 40:
      return chalk.yellow;
    case 30:
      return chalk.green;
    case 20:
      return chalk.blue;
    case 10:
      return chalk.cyan;
    default:
      return chalk.reset;
  }
};

const padLinesWithSpaces = (amount: number, str: string, delimiter = "\n") => {
  const spaces = new Array(amount + 1).join(" ");
  return str.replace(new RegExp(`${delimiter}`, "g"), `${delimiter}${spaces}`);
};

type Input = {
  msg: string;
  level: number;
  ns: string | undefined;
  name: string | undefined;
  stack: string | undefined;
  time: Date;
};

type PropertyMap = Record<string, string>;

const getDeep = (keys: string[], obj: any): any => {
  const [key, ...remainingKeys] = keys;

  if (key == null) {
    return obj;
  }

  return getDeep(remainingKeys, obj[key]);
};

const mapProperties = (propertyMap: PropertyMap, input: any): any => {
  const mapped = input;
  Object.entries(propertyMap).reduce((agg, [to, from]) => {
    if (typeof from !== "string") {
      throw new Error(
        `Invalid property mapping for "${to}": ${JSON.stringify(from)}.`
      );
    }
    agg[to] = getDeep(from.split("."), input);
    return agg;
  }, mapped);
};

const parseInput = (
  propertyMap: Record<string, string>,
  input: string
): Input => {
  const parsed = bourne.parse(input, { protoAction: "remove" });
  const mapped = mapProperties(propertyMap, parsed);

  if (parsed.msg == null) {
    throw new Error("Input is missing `msg`-property");
  }

  const level = parseInt(parsed.level, 10);
  if (level == null || isNaN(level)) {
    throw new Error("Input is missing `level`-property");
  }

  const time = new Date(parseInt(parsed.time, 10));
  if (time == null || isNaN(time.getTime())) {
    throw new Error("Input is missing `time`-property");
  }

  return {
    msg: parsed.msg,
    level,
    ns: parsed.ns,
    name: parsed.name,
    stack: parsed.stack,
    time: time,
  };
};

const defaultPropertyMap = {
  msg: "msg",
  level: "level",
  ns: "ns",
  name: "name",
  stack: "stack",
  time: "time",
};

export const prettifierFactory = (options: {
  propertyMap?: Record<string, string>;
}) => {
  return (line: string) => {
    let input: Input;
    try {
      input = parseInput(options.propertyMap ?? defaultPropertyMap, line);
    } catch (err) {
      // Avoid logging for non-json input.
      debug(`Error parsing input: \`${line}\``);
      debug(err);

      return line;
    }

    const timeText = `${format(input.time, "HH:mm:ss.SS")} `;
    const labels = [input.name, input.ns].filter(Boolean);
    const labelsText = labels.length > 0 ? `[${labels.join(" > ")}] ` : "";

    const headerText = chalk.grey(
      `${timeText}${labelsText}${levelToColor(input.level)(
        levelToString(input.level)
      )}: `
    );
    const headerLength = stripAnsi(headerText).length;
    const stackText = input.stack ? `\n${input.stack}` : "";
    const messageText = padLinesWithSpaces(headerLength, input.msg);

    return `${headerText}${messageText}${padLinesWithSpaces(4, stackText)}`;
  };
};
