import screenview from "@/api/screenview";
import event from "@/api/event";

jest.mock("@/api/event");

describe("api/screenview", () => {
  it("should be called with this parameters", () => {
    screenview("foo");
    expect(event).toHaveBeenCalledWith("screen_view", "foo");

    screenview({ foo: "bar" });
    expect(event).toHaveBeenCalledWith("screen_view", { foo: "bar" });
  });
});
