import exception from "src/api/exception";
import event from "src/api/event";

jest.mock("src/api/event");

describe("exception", () => {
  test("fires a exception event", () => {
    exception({ foo: "bar" });

    expect(event).toHaveBeenCalledWith("exception", {
      foo: "bar",
    });
  });
});
