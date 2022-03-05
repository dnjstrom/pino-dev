import { leftPad } from "./leftPad";

describe("leftPad", () => {
  it("pads the string with n spaces", () => {
    expect(leftPad(5, "foobar")).toBe("     foobar");
  });

  it("Doesn't pad the string if amount is set to 0", () => {
    expect(leftPad(0, "foobar")).toBe("foobar");
  });

  it("Doesn't pad the string if amount is negative", () => {
    expect(leftPad(-4, "foobar")).toBe("foobar");
  });
});
