import { createLocalVue } from "@vue/test-utils";
import extend, { api } from "../src/extend";

describe("extend", () => {
  let Vue;

  beforeEach(() => {
    Vue = createLocalVue();
  });

  it("should extend vue prototype object", () => {
    const keys = Object.keys(api);
    expect(keys).toEqual([
      "query",
      "config",
      "event",
      "pageview",
      "screenview",
      "customMap",
      "time",
      "exception",
      "linker",
      "purchase",
      "set",
      "optIn",
      "optOut"
    ]);
  });

  it("should ", () => {
    extend(Vue);

    expect(Vue.$gtag).toBeDefined();
    expect(Vue.prototype.$gtag).toBeDefined();
  });
});
