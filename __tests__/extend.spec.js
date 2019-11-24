import { createLocalVue } from "@vue/test-utils";
import * as install from "../src/install";
import extend, { api } from "../src/extend";

describe("extend", () => {
  beforeEach(() => {
    install.Vue = createLocalVue();
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
    extend();

    expect(install.Vue.$gtag).toBeDefined();
    expect(install.Vue.prototype.$gtag).toBeDefined();
  });
});
