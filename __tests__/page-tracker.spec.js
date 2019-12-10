import { getRouter, getOptions } from "@/install";
import pageTracker, * as tracker from "@/page-tracker";
import pageview from "@/api/pageview";
import screenview from "@/api/screenview";
import * as util from "@/util";

jest.mock("@/install");
jest.mock("@/api/pageview");
jest.mock("@/api/screenview");

const noop = () => {};

const to = {
  name: "About",
  path: "/about"
};

const from = {
  name: "Home",
  path: "/"
};

describe("page-tracker", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call config to track pageviews", () => {
    getOptions.mockReturnValueOnce({
      pageTrackerTemplate: noop
    });

    const url = "foo";

    global.window = Object.create(window);
    Object.defineProperty(window, "location", {
      value: {
        href: url
      }
    });

    tracker.trackPage(to, from);

    expect(pageview).toHaveBeenCalledWith({
      page_location: url,
      page_path: "/about",
      page_title: "About"
    });

    expect(screenview).not.toHaveBeenCalled();
  });

  it("should call screenview to track screenviews", () => {
    getOptions.mockReturnValueOnce({
      pageTrackerTemplate: noop,
      pageTrackerScreenviewEnabled: true,
      appName: "MyApp"
    });

    tracker.trackPage(to, from);

    expect(screenview).toHaveBeenCalledWith({
      app_name: "MyApp",
      screen_name: "About"
    });
    expect(pageview).not.toHaveBeenCalled();
  });

  it("should", () => {
    const template = {
      foo: "bar",
      bar: "foo"
    };

    getOptions.mockReturnValueOnce({
      pageTrackerTemplate: () => template
    });

    tracker.trackPage(to, from);

    expect(pageview).toHaveBeenCalledWith(template);
  });

  it("should not track when `to` and `from` routes are identical", () => {
    tracker.trackPage({ path: "/foo" }, { path: "/foo" });

    expect(screenview).not.toHaveBeenCalled();
    expect(pageview).not.toHaveBeenCalled();
  });

  it("should warn when using screenview without an appName", () => {
    util.warn = jest.fn();

    getOptions.mockReturnValueOnce({
      pageTrackerTemplate: noop,
      pageTrackerScreenviewEnabled: true
    });

    tracker.trackPage(to, from);

    expect(util.warn).toHaveBeenCalledWith(
      "To use the screenview, add the appName to the plugin options"
    );

    expect(screenview).not.toHaveBeenCalled();
  });

  it("should warn when using screenview without naming routes", () => {
    util.warn = jest.fn();

    getOptions.mockReturnValueOnce({
      pageTrackerTemplate: noop,
      pageTrackerScreenviewEnabled: true,
      appName: "MyApp"
    });

    tracker.trackPage({ path: "/" }, { path: "/about" });

    expect(util.warn).toHaveBeenCalledWith(
      "To use the screenview, name your routes"
    );

    expect(screenview).not.toHaveBeenCalled();
  });

  it("should not trigger init without a Router instance", () => {
    tracker.init = jest.fn();

    pageTracker();

    expect(tracker.init).not.toHaveBeenCalled();
  });

  it("should trigger init", () => {
    const spy = jest.fn();

    getOptions.mockReturnValueOnce({
      onBeforeTrack: noop,
      onAfterTrack: noop
    });

    getRouter.mockReturnValueOnce({
      onReady: spy
    });

    pageTracker();

    expect(spy).toHaveBeenCalled();
  });
});
