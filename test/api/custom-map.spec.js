import customMap from "@/api/custom-map";
import config from "@/api/config";

jest.mock("@/api/config");

describe("customMap", () => {
  test("fires custom_map config", () => {
    customMap({ foo: "bar" });

    expect(config).toHaveBeenCalledWith({
      custom_map: { foo: "bar" },
    });
  });
});
