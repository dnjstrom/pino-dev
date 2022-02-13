import { generateExamples } from "./examples";
import { prettifierFactory } from "../../src";

const prettifier = prettifierFactory();

const run = async () => {
  const examples = await generateExamples();
  examples.map((input) => {
    const output = prettifier(JSON.stringify(input));
    process.stdout.write(output);
  });
};

run();

// Keep the process running forever, relying on ts-node-dev to restart it when necessary.
// eslint-disable-next-line @typescript-eslint/no-empty-function
setInterval(() => {}, 10000);
