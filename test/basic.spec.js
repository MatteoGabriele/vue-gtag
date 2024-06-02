import { createApp } from "vue";
import VueGtag from "@/index";
import bootstrap from "@/bootstrap";

jest.mock("@/bootstrap");

describe("basic", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("installs plugin", () => {
    const app = createApp();

    app.use(VueGtag);

    expect(Object.keys(app.config.globalProperties.$gtag))
      .toMatchInlineSnapshot(`
      Array [
        "config",
        "customMap",
        "event",
        "exception",
        "linker",
        "optIn",
        "optOut",
        "pageview",
        "purchase",
        "query",
        "refund",
        "screenview",
        "set",
        "time",
      ]
    `);
  });

  test("installs plugin without window object", () => {
    const app = createApp();

    delete global.window;

    expect(() => {
      app.use(VueGtag);
    }).not.toThrow();
  });

  test("bootstraps the plugin", () => {
    const app = createApp();

    app.use(VueGtag);

    expect(bootstrap).toHaveBeenCalled();
  });

  test("bootstrap is disabled", () => {
    const app = createApp();

    app.use(VueGtag, {
      bootstrap: false,
    });

    expect(bootstrap).not.toHaveBeenCalled();
  });
});
