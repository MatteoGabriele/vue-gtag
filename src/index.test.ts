import flushPromises from "flush-promises";
import { createApp } from "vue";
import addGtag from "./add-gtag";
import VueGtag, { createGtag } from "./index";
import { resetSettings } from "./settings";

vi.mock("./add-gtag");

describe("index", () => {
  beforeEach(resetSettings);

  it("should be disabled by default", () => {
    createGtag({
      tagId: "UA-1234567",
    });

    expect(addGtag).not.toHaveBeenCalled();
  });

  it("should enable plugin", () => {
    createGtag({
      tagId: "UA-1234567",
      enabled: true,
    });

    expect(addGtag).toHaveBeenCalled();
  });

  it("should enable plugin with a promise", async () => {
    createGtag({
      tagId: "UA-1234567",
      enabled: () => Promise.resolve(true),
    });

    await flushPromises();

    expect(addGtag).toHaveBeenCalled();
  });

  it("should install plugin globally", () => {
    const app = createApp({});

    app.use(VueGtag, {
      tagId: "UA-123456789",
    });

    expect(app.config.globalProperties.$gtag).toBeDefined();
    expect(app.config.globalProperties.$gtag).toMatchInlineSnapshot(`
      {
        "config": [Function],
        "customMap": [Function],
        "event": [Function],
        "exception": [Function],
        "linker": [Function],
        "pageview": [Function],
        "purchase": [Function],
        "query": [Function],
        "refund": [Function],
        "screenview": [Function],
        "set": [Function],
        "time": [Function],
      }
    `);
  });
});
