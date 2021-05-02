import refund from "@/api/refund";
import event from "@/api/event";

jest.mock("@/api/event");

describe("refund", () => {
  test("fires a refund event", () => {
    refund({ foo: "bar" });

    expect(event).toHaveBeenCalledWith("refund", {
      foo: "bar",
    });
  });
});
