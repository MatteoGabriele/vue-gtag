import linker from "@/gtag/linker";
import query from "@/gtag/query";

vi.mock("@/gtag/query");

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
