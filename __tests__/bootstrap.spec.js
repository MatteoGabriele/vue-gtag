import bootstrap from "@/bootstrap";
import { getOptions } from "@/install";
import flushPromises from "flush-promises";
import pageTracker from "@/page-tracker";
import optOut from "@/api/opt-out";
import * as util from "@/util";

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

  it("should load the gtag.js file", done => {
    getOptions.mockReturnValueOnce({
      globalObjectName: "gtag",
      config: {
        id: 1
      }
    });

    bootstrap();

    flushPromises().then(() => {
      expect(util.loadScript).toHaveBeenCalledWith(
        "https://www.googletagmanager.com/gtag/js?id=1",
        "https://www.googletagmanager.com"
      );
      done();
    });
  });

  it("should not load the gtag.js file", () => {
    getOptions.mockReturnValueOnce({
      disableScriptLoad: true,
      globalObjectName: "gtag",
      config: {
        id: 1
      }
    });

    bootstrap();

    expect(util.loadScript).not.toHaveBeenCalled();
  });

  it("should fire the onReady method when gtag is loaded", done => {
    const spy = jest.fn();

    getOptions.mockReturnValueOnce({
      globalObjectName: "gtag",
      onReady: spy,
      config: {
        id: 1
      }
    });

    bootstrap();

    flushPromises().then(() => {
      expect(spy).toHaveBeenCalled();
      done();
    });
  });

  it("should have dataLayer and gtag defined", done => {
    getOptions.mockReturnValueOnce({
      globalObjectName: "gtag",
      config: {
        id: 1
      }
    });

    bootstrap();

    flushPromises().then(() => {
      expect(global.dataLayer).toBeDefined();
      expect(global.gtag).toBeDefined();
      done();
    });
  });

  it("should opt-out when plugin has `enabled` set to false", done => {
    getOptions.mockReturnValueOnce({
      globalObjectName: "gtag",
      enabled: false,
      config: {
        id: 1
      }
    });

    bootstrap();

    flushPromises().then(() => {
      expect(optOut).toHaveBeenCalled();
      done();
    });
  });

  it("should load the gtag.js file also when opt-out", done => {
    getOptions.mockReturnValueOnce({
      enabled: false,
      globalObjectName: "gtag",
      config: {
        id: 1
      }
    });

    bootstrap();

    flushPromises().then(() => {
      expect(util.loadScript).toHaveBeenCalled();
      done();
    });
  });

  it("should have dataLayer and gtag defined also when opt-out", done => {
    getOptions.mockReturnValueOnce({
      enabled: false,
      globalObjectName: "gtag",
      config: {
        id: 1
      }
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
      globalObjectName: "foo",
      config: {
        id: 1
      }
    });

    bootstrap();

    expect(global.gtag).not.toBeDefined();
    expect(global.foo).toBeDefined();

    flushPromises();
  });

  it("should start tracking pages when enabled", () => {
    getOptions.mockReturnValueOnce({
      globalObjectName: "gtag",
      pageTrackerEnabled: true,
      config: {
        id: 1
      }
    });

    bootstrap();

    expect(pageTracker).toHaveBeenCalled();

    flushPromises();
  });

  it("should not start tracking pages when enabled", () => {
    getOptions.mockReturnValueOnce({
      globalObjectName: "gtag",
      pageTrackerEnabled: false,
      config: {
        id: 1
      }
    });

    bootstrap();

    expect(pageTracker).not.toHaveBeenCalled();

    flushPromises();
  });

  it("should return an error when script loading fails", done => {
    util.warn = jest.fn();
    util.loadScript = jest.fn(() => Promise.reject(new Error()));

    getOptions.mockReturnValueOnce({
      globalObjectName: "gtag",
      pageTrackerEnabled: true,
      config: {
        id: 1
      }
    });

    bootstrap();

    flushPromises().then(() => {
      expect(util.warn).toHaveBeenCalledWith(
        "Ops! Something happened and gtag.js couldn't be loaded",
        new Error()
      );
      done();
    });
  });
});
