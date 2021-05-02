import linker from "@/api/linker";
import config from "@/api/config";

jest.mock("@/api/config");

describe("linker", () => {
  test("fires a linker config", () => {
    linker({ foo: "bar" });

    expect(config).toHaveBeenCalledWith("linker", {
      foo: "bar",
    });
  });
});
