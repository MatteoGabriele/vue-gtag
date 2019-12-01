import set from "@/api/set";
import query from "@/api/query";

jest.mock("@/api/query");

describe("api/set", () => {
  it("should be called with this parameters", () => {
    set("foo");
    expect(query).toHaveBeenCalledWith("set", "foo");

    set({ foo: "bar" });
    expect(query).toHaveBeenCalledWith("set", { foo: "bar" });
  });
});
