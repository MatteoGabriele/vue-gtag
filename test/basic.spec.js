import { createLocalVue } from "@vue/test-utils";
import VueGtag from "@/index";
import bootstrap from "@/bootstrap";

jest.mock("@/bootstrap");

describe("basic", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("installs plugin", () => {
    const localVue = createLocalVue();

    localVue.use(VueGtag);

    expect(localVue.$gtag).toBeDefined();
    expect(localVue.prototype.$gtag).toBeDefined();
  });

  test("installs plugin without window object", () => {
    const localVue = createLocalVue();

    delete global.window;

    expect(() => {
      localVue.use(VueGtag);
    }).not.toThrow();
  });

  test("can use API without window object", () => {
    const localVue = createLocalVue();

    localVue.use(VueGtag);

    delete global.window;

    expect(() => {
      localVue.$gtag.query();
    }).not.toThrow();
  });

  test("bootstraps the plugin", () => {
    const localVue = createLocalVue();

    localVue.use(VueGtag);

    expect(bootstrap).toHaveBeenCalled();
  });

  test("bootstrap is disabled", () => {
    const localVue = createLocalVue();

    localVue.use(VueGtag, {
      bootstrap: false,
    });

    expect(bootstrap).not.toHaveBeenCalled();
  });
});
