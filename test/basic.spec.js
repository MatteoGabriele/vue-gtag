import { createLocalVue } from "@vue/test-utils";
import VueGtag from "@/index";

describe("basic", () => {
  test("install plugin", () => {
    const localVue = createLocalVue();

    localVue.use(VueGtag);

    expect(localVue.$gtag).toBeDefined();
    expect(localVue.prototype.$gtag).toBeDefined();
  });

  test("install without window object", () => {
    const localVue = createLocalVue();

    delete global.window;

    expect(() => {
      localVue.use(VueGtag);
    }).not.toThrow();
  });

  test("query without window object", () => {
    const localVue = createLocalVue();

    localVue.use(VueGtag);

    delete global.window;

    expect(() => {
      localVue.$gtag.query();
    }).not.toThrow();
  });
});
