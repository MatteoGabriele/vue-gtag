import { query } from "../query";
import { linker } from "./linker";

vi.mock("../query");

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
