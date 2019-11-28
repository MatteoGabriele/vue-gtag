import bootstrap from "../src/bootstrap";
import * as util from "../src/util";
import flushPromises from "flush-promises";

jest.mock("../src/lib/opt-out");

describe("bootstrap", () => {
  beforeEach(() => {
    util.loadScript = jest.fn(() => Promise.resolve());
  });

  afterEach(() => {
    global.gtag = undefined;
    global.dataLayer = undefined;
  });

  it("should load the gtag.js file", done => {
    bootstrap({
      globalObjectName: "gtag",
      config: {
        id: 1
      }
    });

    flushPromises().then(() => {
      expect(util.loadScript).toHaveBeenCalledWith(
        "https://www.googletagmanager.com/gtag/js?id=1"
      );
      done();
    });
  });

  it("should have dataLayer and gtag defined", done => {
    bootstrap({
      globalObjectName: "gtag",
      config: {
        id: 1
      }
    });

    flushPromises().then(() => {
      expect(global.dataLayer).toBeDefined();
      expect(global.gtag).toBeDefined();
      done();
    });
  });

  it("should opt-out when plugin has `enabled` set to false", done => {
    bootstrap({
      enabled: false,
      globalObjectName: "gtag",
      config: {
        id: 1
      }
    });

    flushPromises().then(() => {
      expect(global["ga-disable-1"]).toEqual(true);
      done();
    });
  });

  it("should load the gtag.js file also when opt-out", done => {
    bootstrap({
      enabled: false,
      globalObjectName: "gtag",
      config: {
        id: 1
      }
    });

    flushPromises().then(() => {
      expect(util.loadScript).toHaveBeenCalledWith(
        "https://www.googletagmanager.com/gtag/js?id=1"
      );
      done();
    });
  });

  it("should have dataLayer and gtag defined also when opt-out", done => {
    bootstrap({
      enabled: false,
      globalObjectName: "gtag",
      config: {
        id: 1
      }
    });

    flushPromises().then(() => {
      expect(global.dataLayer).toBeDefined();
      expect(global.gtag).toBeDefined();
      done();
    });
  });

  it("should inject a custom name for the gtag library", done => {
    bootstrap({
      globalObjectName: "foo",
      config: {
        id: 1
      }
    });

    flushPromises().then(() => {
      expect(global.gtag).not.toBeDefined();
      expect(global.foo).toBeDefined();
      done();
    });
  });
});
