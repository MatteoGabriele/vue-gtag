import event from "@/api/event";
import refund from "@/api/refund";

vi.mock("@/api/event");

describe("refund", () => {
  test("fires a refund event", () => {
    refund({ foo: "bar" });

    expect(event).toHaveBeenCalledWith("refund", {
      foo: "bar",
    });
  });
});
