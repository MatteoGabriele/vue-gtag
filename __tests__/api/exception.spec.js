import exception from "@/api/exception";
import event from "@/api/event";

jest.mock("@/api/event");

describe("api/exception", () => {
  it("should be called with this parameters", () => {
    exception("foo");
    expect(event).toHaveBeenCalledWith("exception", "foo");

    exception({ foo: "bar" });
    expect(event).toHaveBeenCalledWith("exception", { foo: "bar" });
  });
});
