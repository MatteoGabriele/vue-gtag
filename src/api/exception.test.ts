import exception from "@/api/exception";
import query from "@/api/query";

vi.mock("@/api/query");

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
