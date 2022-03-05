import { prettifierFactory } from ".";
import { examples } from "../test/utils/examples";

describe("formatting examples", () => {
  let prettifier: ReturnType<typeof prettifierFactory>;

  beforeEach(() => {
    prettifier = prettifierFactory({
      colorize: false,
    });
  });

  examples.forEach((input, index) => {
    it(`formats example #${index} correctly`, () => {
      expect(prettifier(input)).toMatchSnapshot();
    });
  });
});
