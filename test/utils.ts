import { setDeep } from "../src/utils";

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
});
