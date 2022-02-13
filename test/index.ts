import { prettifierFactory } from "../src";
import { generateExamples } from "./utils/examples";

describe("formatting examples", () => {
  let prettifier: ReturnType<typeof prettifierFactory>;
  let examples: unknown[] = [];

  beforeAll(async () => {
    examples = await generateExamples();
  });

  beforeEach(() => {
    prettifier = prettifierFactory();
  });

  it(`formats all examples correctly`, () => {
    examples.forEach((input) => {
      expect(prettifier(JSON.stringify(input))).toMatchSnapshot();
    });
  });
});
