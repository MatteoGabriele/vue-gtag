import time from "@/api/time";
import event from "@/api/event";

jest.mock("@/api/event");

describe("time", () => {
  test("fires a time event", () => {
    time({ foo: "bar" });

    expect(event).toHaveBeenCalledWith("timing_complete", {
      foo: "bar",
    });
  });
});
