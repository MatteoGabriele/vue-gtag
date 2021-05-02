import { createLocalVue } from "@vue/test-utils";
import VueGtag from "@/index";
import flushPromises from "flush-promises";
import * as api from "@/api";
import mockDate from "mockdate";

mockDate.set("2021-04-20 10:00:00");

jest.mock("@/api");

describe("registerGlobals", () => {
  beforeEach(() => {
    delete window.gtag;
    delete window.dataLayer;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("register global dataLayer and globalObject", () => {
    const localVue = createLocalVue();

    localVue.use(VueGtag, {
      config: {
        id: 1,
      },
    });

    expect(window.gtag).toBeDefined();
    expect(window.dataLayer).toBeDefined();
  });

  test("register globalObject with custom name", () => {
    const localVue = createLocalVue();

    localVue.use(VueGtag, {
      globalObjectName: "foo",
      config: {
        id: 1,
      },
    });

    expect(window.foo).toBeDefined();
    expect(window.dataLayer).toBeDefined();
  });

  test("register dataLayer with custom name", () => {
    const localVue = createLocalVue();

    localVue.use(VueGtag, {
      globalDataLayerName: "bar",
      config: {
        id: 1,
      },
    });

    expect(window.gtag).toBeDefined();
    expect(window.bar).toBeDefined();
  });

  test("first hit is current date", () => {
    const localVue = createLocalVue();

    localVue.use(VueGtag, {
      config: {
        id: 1,
      },
    });

    expect(window.dataLayer).toMatchSnapshot();
  });

  test("optOut when disabled", async () => {
    const localVue = createLocalVue();

    localVue.use(VueGtag, {
      enabled: false,
      config: {
        id: 1,
      },
    });

    await flushPromises();

    expect(api.optOut).toHaveBeenCalled();
  });
});
