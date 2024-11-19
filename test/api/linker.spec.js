import linker from "src/api/linker";
import config from "src/api/config";

jest.mock("src/api/config");

describe("linker", () => {
  test("fires a linker config", () => {
    linker({ foo: "bar" });

    expect(config).toHaveBeenCalledWith("linker", {
      foo: "bar",
    });
  });
});
