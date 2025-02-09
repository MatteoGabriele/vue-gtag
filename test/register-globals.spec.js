import * as api from "@/api";
import VueGtag from "@/index";
import flushPromises from "flush-promises";
import mockDate from "mockdate";
import { createApp } from "vue";

mockDate.set("2021-04-20 10:00:00");

vi.mock("@/api");

describe("registerGlobals", () => {
  beforeEach(() => {
    window.gtag = undefined;
    window.dataLayer = undefined;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("register global dataLayer and globalObject", () => {
    const app = createApp();

    app.use(VueGtag, {
      config: {
        id: 1,
      },
    });

    expect(window.gtag).toBeDefined();
    expect(window.dataLayer).toBeDefined();
  });

  test("register globalObject with custom name", () => {
    const app = createApp();

    app.use(VueGtag, {
      globalObjectName: "foo",
      config: {
        id: 1,
      },
    });

    expect(window.foo).toBeDefined();
    expect(window.dataLayer).toBeDefined();
  });

  test("register dataLayer with custom name", () => {
    const app = createApp();

    app.use(VueGtag, {
      globalDataLayerName: "bar",
      config: {
        id: 1,
      },
    });

    expect(window.gtag).toBeDefined();
    expect(window.bar).toBeDefined();
  });

  test("first hit is current date", () => {
    const app = createApp();

    app.use(VueGtag, {
      config: {
        id: 1,
      },
    });

    expect(window.dataLayer).toEqual([["js", new Date()]]);
  });

  test("optOut when disabled", async () => {
    const app = createApp();

    app.use(VueGtag, {
      enabled: false,
      config: {
        id: 1,
      },
    });

    await flushPromises();

    expect(api.optOut).toHaveBeenCalled();
  });
});
