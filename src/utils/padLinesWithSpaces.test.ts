import { padLinesWithSpaces } from "./padLinesWithSpaces";

describe("padLinesWithSpaces", () => {
  it("pads each line with the correct amount of spaces", () => {
    expect(padLinesWithSpaces(3, "foo\nbar\nbaz", "\n")).toBe(
      "foo\n   bar\n   baz",
    );
  });
});
