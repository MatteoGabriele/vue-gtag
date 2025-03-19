import { createApp } from "vue";
import addGtag from "./add-gtag";
import { createGtag } from "./index";
import { resetSettings } from "./settings";

vi.mock("./add-gtag");

describe("index", () => {
  beforeEach(resetSettings);

  it("should install the plugin", () => {
    const app = createApp({});

    const gtag = createGtag({ tagId: "UA-123456789" });
    app.use(gtag);

    expect(addGtag).toHaveBeenCalled();

    expect(app.config.globalProperties.$gtag).toBeDefined();
    expect(app.config.globalProperties.$gtag).toMatchInlineSnapshot(`
      {
        "config": [Function],
        "consent": [Function],
        "consentDeniedAll": [Function],
        "consentGrantedAll": [Function],
        "customMap": [Function],
        "ecommerce": [Function],
        "event": [Function],
        "exception": [Function],
        "linker": [Function],
        "optIn": [Function],
        "optOut": [Function],
        "pageview": [Function],
        "query": [Function],
        "screenview": [Function],
        "set": [Function],
        "time": [Function],
      }
    `);
  });
});
