import query from "@/gtag/query";
import time from "@/gtag/time";

vi.mock("@/gtag/query");

describe("time", () => {
  it("should use the timing_complete event", () => {
    time({
      event_category: "event_category_value",
    });

    expect(query).toHaveBeenCalledWith("event", "timing_complete", {
      event_category: "event_category_value",
    });
  });
});
