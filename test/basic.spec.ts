import bootstrap from "@/bootstrap";
import VueGtag from "@/index";
import { createApp } from "vue";

vi.mock("@/bootstrap");

describe("basic", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("installs plugin", () => {
    const app = createApp();

    app.use(VueGtag);

    expect(
      Object.keys(app.config.globalProperties.$gtag),
    ).toMatchInlineSnapshot(`
			[
			  "query",
			  "config",
			  "optOut",
			  "optIn",
			  "pageview",
			  "screenview",
			  "exception",
			  "linker",
			  "time",
			  "set",
			  "refund",
			  "purchase",
			  "customMap",
			  "event",
			]
		`);
  });

  test("installs plugin without window object", () => {
    const app = createApp();

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
