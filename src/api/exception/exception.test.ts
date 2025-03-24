import { query } from "../query";
import { exception } from "./exception";

vi.mock("../query");

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
