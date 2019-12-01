import bootstrap from "../src/bootstrap";
import { getOptions } from "../src/install";
import * as util from "../src/util";

jest.mock("../src/install");

describe("bootstrap", () => {
  beforeEach(() => {
    util.loadScript = jest.fn(() => Promise.resolve());
  });

  afterEach(() => {
    global.gtag = undefined;
    global.dataLayer = undefined;
  });

  it("should load the gtag.js file", () => {
    getOptions.mockReturnValueOnce({
      globalObjectName: "gtag",
      config: {
        id: 1
      }
    });

    bootstrap();

    expect(util.loadScript).toHaveBeenCalledWith(
      "https://www.googletagmanager.com/gtag/js?id=1"
    );
  });

  it("should have dataLayer and gtag defined", () => {
    getOptions.mockReturnValueOnce({
      globalObjectName: "gtag",
      config: {
        id: 1
      }
    });

    bootstrap();

    expect(global.dataLayer).toBeDefined();
    expect(global.gtag).toBeDefined();
  });

  it("should opt-out when plugin has `enabled` set to false", () => {
    getOptions.mockReturnValueOnce({
      globalObjectName: "gtag",
      enabled: false,
      config: {
        id: 1
      }
    });

    bootstrap();

    expect(global["ga-disable-1"]).toEqual(true);
  });

  it("should load the gtag.js file also when opt-out", () => {
    getOptions.mockReturnValueOnce({
      enabled: false,
      globalObjectName: "gtag",
      config: {
        id: 1
      }
    });

    bootstrap();

    expect(util.loadScript).toHaveBeenCalled();
  });

  it("should have dataLayer and gtag defined also when opt-out", () => {
    getOptions.mockReturnValueOnce({
      enabled: false,
      globalObjectName: "gtag",
      config: {
        id: 1
      }
    });

    bootstrap();

    expect(global.dataLayer).toBeDefined();
    expect(global.gtag).toBeDefined();
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
  });
});
