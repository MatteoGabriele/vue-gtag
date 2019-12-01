import time from "@/api/time";
import event from "@/api/event";

jest.mock("@/api/event");

describe("api/time", () => {
  it("should be called with this parameters", () => {
    time("foo");
    expect(event).toHaveBeenCalledWith("timing_complete", "foo");

    time({ foo: "bar" });
    expect(event).toHaveBeenCalledWith("timing_complete", { foo: "bar" });
  });
});
