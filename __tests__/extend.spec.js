import { createLocalVue } from "@vue/test-utils";
import { install } from "../src/install";
import { api } from "../src/extend";

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
    install(Vue);

    expect(Vue.$gtag).toBeDefined();
    expect(Vue.prototype.$gtag).toBeDefined();
  });
});
