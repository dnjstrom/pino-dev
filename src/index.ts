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

const statusCodeToColor = (statusCode: number) => {
  if (statusCode >= 500 && statusCode <= 599) {
    return chalk.red;
  } else if (statusCode >= 400 && statusCode <= 499) {
    return chalk.yellow;
  } else if (statusCode >= 300 && statusCode <= 399) {
    return chalk.blue;
  } else if (statusCode >= 200 && statusCode <= 299) {
    return chalk.green;
  } else {
    return chalk.magenta;
  }
};

const repeatString = (amount: number, str: string) =>
  new Array(amount + 1).join(" ");

const padToLength = (length: number, str: string) =>
  repeatString(length - str.length, " ") + str;

const padLinesWithSpaces = (amount: number, str: string, delimiter = "\n") => {
  const spaces = repeatString(amount, " ");
  return str.replace(new RegExp(`${delimiter}`, "g"), `${delimiter}${spaces}`);
};

type Request = {
  method: string;
  url: string;
};

type Response = {
  statusCode: number;
};

type Input = {
  time: Date;
  level: number;
  msg: string;
  ns?: string;
  name?: string;
  stack?: string;
  req?: Request;
  res?: Response;
  responseTime?: number;
};

type PropertyMap = Record<string, string>;

const getDeep = (keys: string[], obj: any): any => {
  const [key, ...remainingKeys] = keys;

  if (obj == null) {
    return undefined;
  } else if (key == null) {
    return obj;
  }

  return getDeep(remainingKeys, obj[key]);
};

export const setDeep = (obj: any = {}, keys: string[], value: any): any => {
  const [key, ...remainingKeys] = keys;

  if (key == null) {
    return obj;
  } else if (remainingKeys.length === 0) {
    obj[key] = value;
    return obj;
  }

  obj[key] = setDeep(obj[key] ? obj[key] : {}, remainingKeys, value);

  return obj;
};

const mapProperties = (propertyMap: PropertyMap, input: any): any =>
  Object.entries(propertyMap).reduce((agg, [to, from]) => {
    if (typeof from === "boolean" && !from) {
      return agg;
    } else if (typeof from !== "string") {
      throw new Error(
        `Invalid property mapping for "${to}": ${JSON.stringify(from)}.`
      );
    }

    const value = getDeep(from.split("."), input);

    setDeep(agg, to.split("."), value);

    return agg;
  }, {});

const parseInput = (
  propertyMap: Record<string, string>,
  input: string
): Input => {
  const parsed = bourne.parse(input, { protoAction: "remove" });
  const mapped = mapProperties(propertyMap, parsed);

  if (mapped.msg == null) {
    throw new Error("Input is missing `msg`-property");
  }

  // Todo: Are these actually required?
  const level = parseInt(mapped.level, 10);
  if (level == null || isNaN(level)) {
    throw new Error("Input is missing `level`-property");
  }

  const time = new Date(parseInt(mapped.time, 10));
  if (time == null || isNaN(time.getTime())) {
    throw new Error("Input is missing `time`-property");
  }

  return mapped;
};

const defaultPropertyMap: PropertyMap = {
  msg: "msg",
  level: "level",
  ns: "ns",
  name: "name",
  stack: "stack",
  time: "time",
  "req.method": "req.method",
  "req.url": "req.url",
  "res.statusCode": "res.statusCode",
  responseTime: "responseTime",
};

export const prettifierFactory = (options?: {
  propertyMap?: Record<string, string>;
}) => {
  const propertyMap = { ...defaultPropertyMap, ...options?.propertyMap };

  return (line: string) => {
    let input: Input;
    try {
      input = parseInput(propertyMap ?? defaultPropertyMap, line);
    } catch (err) {
      // Avoid logging for non-json input.
      debug(`Error parsing input: \`${line}\``);
      debug(err);

      return line + "\n";
    }

    if (input.req && input.res && input.responseTime) {
      return formatHttpResponseMessage(input);
    }

    return formatStandardMessage(input);
  };
};

const formatStandardMessage = (input: Input) => {
  const timeText = `${format(input.time, "HH:mm:ss.SSS")} `;
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

  return `${headerText}${messageText}${padLinesWithSpaces(4, stackText)}\n`;
};

const formatHttpResponseMessage = (input: Input) => {
  const timeText = `${format(input.time, "HH:mm:ss.SSS")} `;
  const labels = [input.name, input.ns].filter(Boolean);
  const labelsText = labels.length > 0 ? `[${labels.join(" > ")}] ` : "";

  const headerText = chalk.grey(
    `${timeText}${labelsText}${levelToColor(input.level)(
      levelToString(input.level)
    )}:`
  );

  const methodText = input.req?.method
    ? chalk.cyan(input.req.method)
    : undefined;
  const statusText = input.res?.statusCode
    ? statusCodeToColor(input.res.statusCode)(String(input.res.statusCode))
    : undefined;
  const responseTimeText = input.responseTime
    ? ` ${input.responseTime} ms`
    : undefined;

  return (
    [headerText, methodText, input.req?.url, statusText, responseTimeText]
      .filter(Boolean)
      .join(" ") + "\n"
  );
};
