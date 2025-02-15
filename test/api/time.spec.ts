import event from "@/api/event";
import time from "@/api/time";

vi.mock("@/api/event");

describe("time", () => {
  test("fires a time event", () => {
    time({ foo: "bar" });

    expect(event).toHaveBeenCalledWith("timing_complete", {
      foo: "bar",
    });
  });
});
