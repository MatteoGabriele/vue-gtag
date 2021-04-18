import { install } from "./utils";

describe("basic", () => {
  test("install plugin", () => {
    const vue = install();

    expect(vue.$gtag).toBeDefined();
    expect(vue.prototype.$gtag).toBeDefined();
  });

  test("install without window object", () => {
    delete global.window;

    expect(() => {
      install();
    }).not.toThrow();
  });

  test("query without window object", () => {
    delete global.window;

    const vue = install();

    expect(() => {
      vue.$gtag.query();
    }).not.toThrow();
  });
});
