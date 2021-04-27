import event from "@/api/event";
import query from "@/api/query";

jest.mock("@/api/query");

describe("event", () => {
  test("fires an event", () => {
    event("foo");
    expect(query).toHaveBeenCalledWith("event", "foo");
  });
});
