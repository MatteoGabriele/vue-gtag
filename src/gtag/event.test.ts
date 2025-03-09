import event from "@/gtag/event";
import query from "./query";

vi.mock("@/gtag/query");

describe("event", () => {
  it("should query the event command", () => {
    event("screen_view", { screen_name: "about" });

    expect(query).toHaveBeenCalledWith("event", "screen_view", {
      screen_name: "about",
    });
  });
});
