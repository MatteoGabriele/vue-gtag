import linker from "@/api/linker";
import event from "@/api/event";

jest.mock("@/api/event");

describe("api/linker", () => {
  it("should be called with this parameters", () => {
    linker("foo");
    expect(event).toHaveBeenCalledWith("linker", "foo");

    linker({ foo: "bar" });
    expect(event).toHaveBeenCalledWith("linker", { foo: "bar" });
  });
});
