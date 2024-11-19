import time from "src/api/time";
import event from "src/api/event";

jest.mock("src/api/event");

describe("time", () => {
  test("fires a time event", () => {
    time({ foo: "bar" });

    expect(event).toHaveBeenCalledWith("timing_complete", {
      foo: "bar",
    });
  });
});
