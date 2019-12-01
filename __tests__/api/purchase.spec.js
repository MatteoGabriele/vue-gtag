import purchase from "@/api/purchase";
import event from "@/api/event";

jest.mock("@/api/event");

describe("api/purchase", () => {
  it("should be called with this parameters", () => {
    purchase("foo");
    expect(event).toHaveBeenCalledWith("purchase", "foo");

    purchase({ foo: "bar" });
    expect(event).toHaveBeenCalledWith("purchase", { foo: "bar" });
  });
});
