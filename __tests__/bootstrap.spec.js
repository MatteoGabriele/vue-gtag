import { install } from "../src/install";
import * as util from "../src/util";

jest.mock("../src/lib/opt-out");
jest.mock("../src/extend");

describe("bootstrap", () => {
  beforeEach(() => {
    util.loadScript = jest.fn(() => Promise.resolve());
  });

  afterEach(() => {
    global.gtag = undefined;
    global.dataLayer = undefined;
  });

  it("should load the gtag.js file", () => {
    install(null, {
      config: {
        id: 1
      }
    });

    expect(util.loadScript).toHaveBeenCalledWith(
      "https://www.googletagmanager.com/gtag/js?id=1"
    );
  });

  it("should have dataLayer and gtag defined", () => {
    install(null, {
      config: {
        id: 1
      }
    });

    expect(global.dataLayer).toBeDefined();
    expect(global.gtag).toBeDefined();
  });

  it("should opt-out when plugin has `enabled` set to false", () => {
    install(null, {
      enabled: false,
      config: {
        id: 1
      }
    });

    expect(global["ga-disable-1"]).toEqual(true);
  });

  it("should load the gtag.js file also when opt-out", () => {
    install(null, {
      enabled: false
    });

    expect(util.loadScript).toHaveBeenCalled();
  });

  it("should have dataLayer and gtag defined also when opt-out", () => {
    install(null, {
      enabled: false,
      config: {
        id: 1
      }
    });

    expect(global.dataLayer).toBeDefined();
    expect(global.gtag).toBeDefined();
  });

  it("should inject a custom name for the gtag library", () => {
    install(null, {
      globalObjectName: "foo"
    });

    expect(global.gtag).not.toBeDefined();
    expect(global.foo).toBeDefined();
  });
});
