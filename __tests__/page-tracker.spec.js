import { getOptions } from "@/install";
import { trackPage } from "@/page-tracker";
import config from "@/api/config";
import screenview from "@/api/screenview";

jest.mock("@/install");
jest.mock("@/api/config");
jest.mock("@/api/screenview");

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
    getOptions.mockReturnValueOnce({});

    const url = "foo";

    global.window = Object.create(window);
    Object.defineProperty(window, "location", {
      value: {
        href: url
      }
    });

    trackPage(to, from);

    expect(config).toHaveBeenCalledWith({
      page_location: url,
      page_path: "/about",
      page_title: "About"
    });

    expect(screenview).not.toHaveBeenCalled();
  });

  it("should call screenview to track screenviews", () => {
    getOptions.mockReturnValueOnce({
      pageTrackerScreenviewEnabled: true,
      appName: "MyApp"
    });

    trackPage(to, from);

    expect(screenview).toHaveBeenCalledWith({
      app_name: "MyApp",
      screen_name: "About"
    });
    expect(config).not.toHaveBeenCalled();
  });

  it("should", () => {
    const template = {
      foo: "bar",
      bar: "foo"
    };

    getOptions.mockReturnValueOnce({
      pageTrackerTemplate: () => template
    });

    trackPage(to, from);

    expect(config).toHaveBeenCalledWith(template);
  });
});
