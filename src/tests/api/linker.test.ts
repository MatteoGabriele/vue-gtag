import { linker } from "@/api/linker";
import { query } from "@/api/query";

vi.mock("@/api/query");

describe("linker", () => {
  it("should use the linker event", () => {
    linker({
      domains: ["domain1.com", "domain2.com"],
    });

    expect(query).toHaveBeenCalledWith("set", "linker", {
      domains: ["domain1.com", "domain2.com"],
    });
  });
});
