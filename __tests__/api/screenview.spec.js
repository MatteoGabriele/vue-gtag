import { getOptions } from "@/install";
import screenview from "@/api/screenview";
import event from "@/api/event";

jest.mock("@/api/event");
jest.mock("@/install");

describe("api/screenview", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be called with this parameters", () => {
    getOptions.mockReturnValue({
      config: { id: 1 },
      appName: "MyApp",
    });

    screenview("bar");

    expect(event).toHaveBeenCalledWith("screen_view", {
      send_page_view: true,
      screen_name: "bar",
      app_name: "MyApp",
    });

    screenview({ foo: "bar" });

    expect(event).toHaveBeenCalledWith("screen_view", {
      send_page_view: true,
      foo: "bar",
      app_name: "MyApp",
    });
  });
});
