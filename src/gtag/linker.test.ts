import linker from "@/gtag/linker";
import query from "@/gtag/query";

vi.mock("@/gtag/query");

describe("linker", () => {
  it("should use the linker event", () => {
    linker({
      domains: [],
    });

    expect(query).toHaveBeenCalledWith("set", "linker", {
      decorate_forms: false,
      domains: [],
      url_position: "query",
    });
  });

  it("should have accept_incoming default to true when has domains", () => {
    linker({
      domains: ["domain.com"],
    });

    expect(query).toHaveBeenCalledWith("set", "linker", {
      decorate_forms: false,
      url_position: "query",
      accept_incoming: true,
      domains: ["domain.com"],
    });
  });

  it("should overrides parameters", () => {
    linker({
      domains: ["domain.com"],
      decorate_forms: true,
      url_position: "fragment",
      accept_incoming: false,
    });

    expect(query).toHaveBeenCalledWith("set", "linker", {
      decorate_forms: true,
      url_position: "fragment",
      accept_incoming: false,
      domains: ["domain.com"],
    });
  });
});
