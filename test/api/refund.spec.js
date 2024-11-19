import refund from "src/api/refund";
import event from "src/api/event";

jest.mock("src/api/event");

describe("refund", () => {
  test("fires a refund event", () => {
    refund({ foo: "bar" });

    expect(event).toHaveBeenCalledWith("refund", {
      foo: "bar",
    });
  });
});
