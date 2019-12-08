import event from "@/api/event";
import query from "@/api/query";

jest.mock("@/api/query");

describe("api/event", () => {
  it("should be called with this parameters", () => {
    event("click", { foo: "bar" });
    expect(query).toHaveBeenCalledWith("event", "click", { foo: "bar" });
  });
});
