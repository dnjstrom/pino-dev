import path from "path";
import { readFileSync } from "fs";
import { overrideDynamicLogProperties } from "./overrideDynamicLogProperties";

const buffer = readFileSync(path.join(__dirname, "/examples.ndjson"));
const lines = buffer.toString().split("\n");

export const examples: unknown[] = lines.map((line) => {
  try {
    return overrideDynamicLogProperties(JSON.parse(line));
  } catch (error) {
    return line;
  }
});
