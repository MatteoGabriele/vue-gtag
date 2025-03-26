import { query } from "@/api/query";
import set from "./set";

vi.mock("@/api/query");

describe("set", () => {
  it("should use the set command", () => {
    set({ parameter: "value" });

    expect(query).toHaveBeenCalledWith("set", {
      parameter: "value",
    });
  });
});
