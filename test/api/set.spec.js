import set from "src/api/set";
import query from "src/api/query";

jest.mock("src/api/query");

describe("set", () => {
  test("fires set", () => {
    set("foo", "bar");

    expect(query).toHaveBeenCalledWith("set", "foo", "bar");
  });
});
