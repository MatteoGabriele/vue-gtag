import exception from "./exception";
import query from "./query";

vi.mock("./query");

describe("exception", () => {
  it("should use the exception event", () => {
    exception({
      description: "error_description",
      fatal: false,
    });

    expect(query).toHaveBeenCalledWith("event", "exception", {
      description: "error_description",
      fatal: false,
    });
  });
});
