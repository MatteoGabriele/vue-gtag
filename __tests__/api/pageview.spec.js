import pageview from "@/api/pageview";
import config from "@/api/config";

jest.mock("@/api/config");

describe("api/pageview", () => {
  it("should be called with this parameters", () => {
    pageview("foo");
    expect(config).toHaveBeenCalledWith({
      page_path: "foo",
      page_location: "http://localhost/",
    });

    pageview({ foo: "bar" });
    expect(config).toHaveBeenCalledWith({ foo: "bar" });
  });
});
