import customMap from "src/api/custom-map";
import config from "src/api/config";

jest.mock("src/api/config");

describe("customMap", () => {
  test("fires custom_map config", () => {
    customMap({ foo: "bar" });

    expect(config).toHaveBeenCalledWith({
      custom_map: { foo: "bar" },
    });
  });
});
