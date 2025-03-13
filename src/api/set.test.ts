import query from "./query";
import set from "./set";

vi.mock("./query");

describe("set", () => {
  it("should the set command", () => {
    set({ parameter: "value" });

    expect(query).toHaveBeenCalledWith("set", {
      parameter: "value",
    });
  });
});
