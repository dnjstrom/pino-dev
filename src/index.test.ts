import pinoDev from ".";
import { examples } from "../test/utils/examples";

describe("formatting examples", () => {
  let prettifier: ReturnType<typeof pinoDev>;

  beforeEach(() => {
    prettifier = pinoDev({
      colorize: false,
    });
  });

  examples.forEach((input, index) => {
    it(`formats example #${index} correctly`, () => {
      expect(prettifier(input)).toMatchSnapshot();
    });
  });
});
