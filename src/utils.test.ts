import { setDeep, leftPad, padLinesWithSpaces, getDeep } from "./utils";

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

describe("padLinesWithSpaces", () => {
  it("pads each line with the correct amount of spaces", () => {
    expect(padLinesWithSpaces(3, "foo\nbar\nbaz", "\n")).toBe(
      "foo\n   bar\n   baz"
    );
  });
});

describe("setDeep", () => {
  it("sets shallow objects properly", () => {
    expect(setDeep({}, ["foo"], 42)).toEqual({ foo: 42 });
  });

  it("sets deep objects properly", () => {
    expect(setDeep({ foo: {} }, ["foo", "bar"], 42)).toEqual({
      foo: { bar: 42 },
    });
  });

  it("adds objects if necessary", () => {
    expect(setDeep({}, ["foo", "bar"], 42)).toEqual({
      foo: { bar: 42 },
    });
  });

  it("adds deep objects if necessary", () => {
    expect(() => setDeep({ foo: 123 }, ["foo", "bar"], 42)).toThrow();
  });

  it("throws on empty path", () => {
    expect(() => setDeep({}, [], 42)).toThrow();
  });
});

describe("getDeep", () => {
  it("should get the value specified by the path", () => {
    expect(getDeep(["foo", "bar"], { foo: { bar: 42 } })).toBe(42);
  });

  it("should return the object given an empty path", () => {
    expect(getDeep([], { foo: 42 })).toEqual({ foo: 42 });
  });

  it("should return undefined given an incorrect path", () => {
    expect(getDeep(["foo", "bar", "baz"], { foo: 42 })).toBe(undefined);
  });
});
