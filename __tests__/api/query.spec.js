import { getOptions } from "@/install";
import query from "@/api/query";

jest.mock("@/install");

describe("api/query", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should call the gtag main object", () => {
    global.window = Object.create(window);
    Object.defineProperty(window, "gtag", {
      value: jest.fn()
    });

    getOptions.mockReturnValue({
      globalObjectName: "gtag"
    });

    query("foo", "bar");

    expect(global.window.gtag).toHaveBeenCalledWith("foo", "bar");
  });

  it("should not call window.gtag", () => {
    delete global.window;

    getOptions.mockReturnValue({
      globalObjectName: "gtag"
    });

    query("foo", "bar");

    expect(global.window).toBeUndefined();
  });
});
