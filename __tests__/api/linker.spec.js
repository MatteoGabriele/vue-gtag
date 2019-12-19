import linker from "@/api/linker";
import config from "@/api/config";

jest.mock("@/api/config");

describe("api/linker", () => {
  it("should be called with this parameters", () => {
    linker({ foo: "bar" });
    expect(config).toHaveBeenCalledWith("linker", { foo: "bar" });
  });
});
