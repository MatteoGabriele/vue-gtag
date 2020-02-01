import refund from "@/api/refund";
import event from "@/api/event";

jest.mock("@/api/event");

describe("api/refund", () => {
  it("should be called with this parameters", () => {
    refund("foo");
    expect(event).toHaveBeenCalledWith("refund", "foo");

    refund({ foo: "bar" });
    expect(event).toHaveBeenCalledWith("refund", { foo: "bar" });
  });
});
