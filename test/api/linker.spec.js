import config from "@/api/config";
import linker from "@/api/linker";

vi.mock("@/api/config");

describe("linker", () => {
  test("fires a linker config", () => {
    linker({ foo: "bar" });

    expect(config).toHaveBeenCalledWith("linker", {
      foo: "bar",
    });
  });
});
