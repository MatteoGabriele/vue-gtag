import set from "@/api/set";
import query from "@/api/query";

jest.mock("@/api/query");

describe("set", () => {
  test("fires set", () => {
    set("foo", "bar");

    expect(query).toHaveBeenCalledWith("set", "foo", "bar");
  });
});
