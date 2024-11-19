import purchase from "src/api/purchase";
import event from "src/api/event";

jest.mock("src/api/event");

describe("purchase", () => {
  test("fires a purchase event", () => {
    purchase({ foo: "bar" });

    expect(event).toHaveBeenCalledWith("purchase", {
      foo: "bar",
    });
  });
});
