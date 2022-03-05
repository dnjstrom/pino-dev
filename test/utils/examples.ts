import path from "path";
import { readFileSync } from "fs";
import { overrideDynamicLogProperties } from "./overrideDynamicLogProperties";

const buffer = readFileSync(path.join(__dirname, "/examples.ndjson"));
const lines = buffer.toString().split("\n");

export const examples: string[] = lines.map((line) => {
  try {
    return JSON.stringify(overrideDynamicLogProperties(JSON.parse(line)));
  } catch (error) {
    return line;
  }
});
