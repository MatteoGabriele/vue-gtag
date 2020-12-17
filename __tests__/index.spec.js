import { install } from "@/install";
import * as entry from "@/index.js";

describe("entry point", () => {
  it("should export install", () => {
    expect(entry.default).toEqual(install);
  });

  it("should export bootstrap", () => {
    expect(entry.bootstrap).toBeDefined();
  });

  it("should export setOptions", () => {
    expect(entry.setOptions).toBeDefined();
  });

  it("should export setRouter", () => {
    expect(entry.setRouter).toBeDefined();
  });
});
