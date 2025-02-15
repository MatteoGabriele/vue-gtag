import query from "@/api/query";
import set from "@/api/set";

vi.mock("@/api/query");

describe("set", () => {
  test("fires set", () => {
    set("foo", "bar");

    expect(query).toHaveBeenCalledWith("set", "foo", "bar");
  });
});
