import { getDeep } from "./getDeep";

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
