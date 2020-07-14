import { warn } from "@/util";
import { getRouter, getOptions } from "@/install";
import * as pageTracker from "@/page-tracker";
import pageview from "@/api/pageview";
import screenview from "@/api/screenview";

jest.mock("@/install");
jest.mock("@/api/pageview");
jest.mock("@/api/screenview");
jest.mock("@/util");

const toMock = { name: "about", path: "/about" };
const fromMock = { name: "home", path: "/" };

const updateLocationPath = href => {
  global.window = Object.create(window);

  Object.defineProperty(window, "location", {
    value: {
      href
    }
  });
};

describe("page-tracker", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should track a pageview", () => {
    updateLocationPath("http://localhost/about");

    getOptions.mockReturnValue({
      pageTrackerTemplate: () => null
    });

    pageTracker.trackPage({ to: toMock, from: fromMock });

    expect(pageview).toHaveBeenCalledWith({
      page_location: "http://localhost/about",
      page_path: "/about",
      page_title: "about"
    });
  });

  it("should track a screenview", () => {
    updateLocationPath("http://localhost/about");

    getOptions.mockReturnValue({
      pageTrackerScreenviewEnabled: true,
      pageTrackerTemplate: () => null,
      appName: "MyApp"
    });

    pageTracker.trackPage({ to: toMock, from: fromMock });

    expect(screenview).toHaveBeenCalledWith({
      app_name: "MyApp",
      screen_name: "about"
    });
  });

  it("should not track when same path", () => {
    const to = { name: "home", path: "/" };
    const from = { name: "home", path: "/" };

    updateLocationPath("http://localhost/");

    getOptions.mockReturnValue({
      pageTrackerTemplate: () => null,
      pageTrackerSkipSamePath: true
    });

    pageTracker.trackPage({ to, from });

    expect(pageview).not.toHaveBeenCalled();
  });

  it("should track the same path", () => {
    const to = { name: "home", path: "/" };
    const from = { name: "home", path: "/" };

    updateLocationPath("http://localhost/about");

    getOptions.mockReturnValue({
      pageTrackerTemplate: () => null,
      pageTrackerSkipSamePath: false
    });

    pageTracker.trackPage({ to, from });

    expect(pageview).toHaveBeenCalled();
  });

  it("should warn when using screenview without an appName", () => {
    getOptions.mockReturnValue({
      pageTrackerTemplate: () => null,
      pageTrackerScreenviewEnabled: true
    });

    pageTracker.trackPage({ to: toMock, from: fromMock });

    expect(warn).toHaveBeenCalledWith(
      "To use the screenview, add the appName to the plugin options"
    );
  });

  it("should warn when using screenview without naming routes", () => {
    getOptions.mockReturnValue({
      pageTrackerTemplate: () => null,
      pageTrackerScreenviewEnabled: true,
      appName: "MyApp"
    });

    const to = { path: "/" };
    const from = { path: "/about" };

    pageTracker.trackPage({ to, from });

    expect(warn).toHaveBeenCalledWith(
      "To use the screenview, name your routes"
    );

    expect(screenview).not.toHaveBeenCalled();
  });

  it("should return a custom template", () => {
    getOptions.mockReturnValue({
      pageTrackerTemplate() {
        return {
          page_title: "foo",
          page_path: "bar",
          page_location: "/foo/bar"
        };
      }
    });

    pageTracker.trackPage({ to: toMock, from: fromMock });

    expect(pageview).toHaveBeenCalledWith({
      page_title: "foo",
      page_path: "bar",
      page_location: "/foo/bar"
    });
  });

  it("should not trigger init without a Router instance", () => {
    pageTracker.startRouter = jest.fn();

    pageTracker.autotrack();

    expect(pageTracker.startRouter).not.toHaveBeenCalled();
  });

  it("should trigger init", () => {
    const spy = jest.fn();

    getOptions.mockReturnValue({
      onBeforeTrack: () => {},
      onAfterTrack: () => {}
    });

    getRouter.mockReturnValueOnce({
      onReady: spy
    });

    pageTracker.autotrack();

    expect(spy).toHaveBeenCalled();
  });
});
