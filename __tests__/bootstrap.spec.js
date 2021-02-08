import config from "@/api/config";
import bootstrap from "@/bootstrap";
import { getRouter, getOptions } from "@/install";
import flushPromises from "flush-promises";
import pageTracker from "@/page-tracker";
import optOut from "@/api/opt-out";
import * as util from "@/util";

jest.mock("@/api/config");
jest.mock("@/page-tracker");
jest.mock("@/api/opt-out");
jest.mock("@/install");

describe("bootstrap", () => {
  beforeEach(() => {
    util.loadScript = jest.fn(() => Promise.resolve());
  });

  afterEach(() => {
    jest.clearAllMocks();
    global.gtag = undefined;
    global.dataLayer = undefined;
  });

  it("should load the gtag.js file", (done) => {
    getOptions.mockReturnValueOnce({
      globalDataLayerName: "dataLayer",
      globalObjectName: "gtag",
      config: {
        id: 1,
      },
      customResourceURL: "https://www.googletagmanager.com/gtag/js",
      customPreconnectOrigin: "https://www.googletagmanager.com",
    });

    bootstrap();

    flushPromises().then(() => {
      expect(util.loadScript).toHaveBeenCalledWith(
        "https://www.googletagmanager.com/gtag/js?id=1&l=dataLayer",
        "https://www.googletagmanager.com"
      );
      done();
    });
  });

  it("should load gtag.js file from custom resource url", (done) => {
    getOptions.mockReturnValueOnce({
      globalDataLayerName: "dataLayer",
      globalObjectName: "gtag",
      config: {
        id: 1,
      },
      customResourceURL: "https://www.example.com/gtag/js",
      customPreconnectOrigin: "https://www.example.com",
    });

    bootstrap();

    flushPromises().then(() => {
      expect(util.loadScript).toHaveBeenCalledWith(
        "https://www.example.com/gtag/js?id=1&l=dataLayer",
        "https://www.example.com"
      );
      done();
    });
  });

  it("should not load the gtag.js file", () => {
    getOptions.mockReturnValueOnce({
      disableScriptLoad: true,
      globalDataLayerName: "dataLayer",
      globalObjectName: "gtag",
      config: {
        id: 1,
      },
      customResourceURL: "https://www.googletagmanager.com/gtag/js",
      customPreconnectOrigin: "https://www.googletagmanager.com",
    });

    bootstrap();

    expect(util.loadScript).not.toHaveBeenCalled();
  });

  it("should fire the onReady method when gtag is loaded", (done) => {
    const spy = jest.fn();

    getOptions.mockReturnValueOnce({
      globalDataLayerName: "dataLayer",
      globalObjectName: "gtag",
      onReady: spy,
      config: {
        id: 1,
      },
      customResourceURL: "https://www.googletagmanager.com/gtag/js",
      customPreconnectOrigin: "https://www.googletagmanager.com",
    });

    bootstrap();

    flushPromises().then(() => {
      expect(spy).toHaveBeenCalled();
      done();
    });
  });

  it("should have dataLayer and gtag defined", (done) => {
    getOptions.mockReturnValueOnce({
      globalDataLayerName: "dataLayer",
      globalObjectName: "gtag",
      config: {
        id: 1,
      },
      customResourceURL: "https://www.googletagmanager.com/gtag/js",
      customPreconnectOrigin: "https://www.googletagmanager.com",
    });

    bootstrap();

    flushPromises().then(() => {
      expect(global.dataLayer).toBeDefined();
      expect(global.gtag).toBeDefined();
      done();
    });
  });

  it("should opt-out when plugin has `enabled` set to false", (done) => {
    getOptions.mockReturnValueOnce({
      globalDataLayerName: "dataLayer",
      globalObjectName: "gtag",
      enabled: false,
      config: {
        id: 1,
      },
      customResourceURL: "https://www.googletagmanager.com/gtag/js",
      customPreconnectOrigin: "https://www.googletagmanager.com",
    });

    bootstrap();

    flushPromises().then(() => {
      expect(optOut).toHaveBeenCalled();
      done();
    });
  });

  it("should load the gtag.js file also when opt-out", (done) => {
    getOptions.mockReturnValueOnce({
      enabled: false,
      globalDataLayerName: "dataLayer",
      globalObjectName: "gtag",
      config: {
        id: 1,
      },
      customResourceURL: "https://www.googletagmanager.com/gtag/js",
      customPreconnectOrigin: "https://www.googletagmanager.com",
    });

    bootstrap();

    flushPromises().then(() => {
      expect(util.loadScript).toHaveBeenCalled();
      done();
    });
  });

  it("should have dataLayer and gtag defined also when opt-out", (done) => {
    getOptions.mockReturnValueOnce({
      enabled: false,
      globalDataLayerName: "dataLayer",
      globalObjectName: "gtag",
      config: {
        id: 1,
      },
      customResourceURL: "https://www.googletagmanager.com/gtag/js",
      customPreconnectOrigin: "https://www.googletagmanager.com",
    });

    bootstrap();

    flushPromises().then(() => {
      expect(global.dataLayer).toBeDefined();
      expect(global.gtag).toBeDefined();
      done();
    });
  });

  it("should inject a custom name for the gtag library", () => {
    getOptions.mockReturnValueOnce({
      globalDataLayerName: "dataLayer",
      globalObjectName: "foo",
      config: {
        id: 1,
      },
      customResourceURL: "https://www.googletagmanager.com/gtag/js",
      customPreconnectOrigin: "https://www.googletagmanager.com",
    });

    bootstrap();

    expect(global.gtag).not.toBeDefined();
    expect(global.foo).toBeDefined();

    flushPromises();
  });

  it("should start tracking pages when enabled", () => {
    getRouter.mockReturnValueOnce({});
    getOptions.mockReturnValueOnce({
      globalDataLayerName: "dataLayer",
      globalObjectName: "gtag",
      pageTrackerEnabled: true,
      config: {
        id: 1,
      },
      customResourceURL: "https://www.googletagmanager.com/gtag/js",
      customPreconnectOrigin: "https://www.googletagmanager.com",
    });

    bootstrap();

    expect(pageTracker).toHaveBeenCalled();
    expect(config).not.toHaveBeenCalled();

    flushPromises();
  });

  it("should not start tracking pages when disabled", () => {
    getOptions.mockReturnValueOnce({
      globalDataLayerName: "dataLayer",
      globalObjectName: "gtag",
      pageTrackerEnabled: false,
      config: {
        id: 1,
      },
      customResourceURL: "https://www.googletagmanager.com/gtag/js",
      customPreconnectOrigin: "https://www.googletagmanager.com",
    });

    bootstrap();

    expect(pageTracker).not.toHaveBeenCalled();

    flushPromises();
  });

  it("should fire a config when pageTracker is not enabled", () => {
    getOptions.mockReturnValueOnce({
      globalDataLayerName: "dataLayer",
      globalObjectName: "gtag",
      config: {
        id: 1,
      },
      customResourceURL: "https://www.googletagmanager.com/gtag/js",
      customPreconnectOrigin: "https://www.googletagmanager.com",
    });

    bootstrap();

    expect(config).toHaveBeenCalled();

    flushPromises();
  });
});
