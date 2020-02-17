import pageview from "@/api/pageview";
import event from "@/api/event";

jest.mock("@/api/event");

describe("api/pageview", () => {
  it("should be called with this parameters", () => {
    pageview("foo");
    expect(event).toHaveBeenCalledWith("page_view", {
      page_path: "foo",
      page_location: "http://localhost/"
    });

    pageview({ foo: "bar" });
    expect(event).toHaveBeenCalledWith("page_view", { foo: "bar" });
  });
});
