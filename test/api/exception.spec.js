import exception from "@/api/exception";
import event from "@/api/event";

jest.mock("@/api/event");

describe("exception", () => {
  test("fires a exception event", () => {
    exception({ foo: "bar" });

    expect(event).toHaveBeenCalledWith("exception", {
      foo: "bar",
    });
  });
});
