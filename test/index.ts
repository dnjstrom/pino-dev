import { prettifierFactory } from "../src";
import { examples } from "./utils/examples";

describe("formatting examples", () => {
  let prettifier: ReturnType<typeof prettifierFactory>;

  beforeEach(() => {
    prettifier = prettifierFactory();
  });

  examples.forEach((input, index) => {
    it(`formats example #${index} correctly`, () => {
      expect(prettifier(JSON.stringify(input))).toMatchSnapshot();
    });
  });
});
