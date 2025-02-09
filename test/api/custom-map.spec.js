import config from "@/api/config";
import customMap from "@/api/custom-map";

vi.mock("@/api/config");

describe("customMap", () => {
  test("fires custom_map config", () => {
    customMap({ foo: "bar" });

    expect(config).toHaveBeenCalledWith({
      custom_map: { foo: "bar" },
    });
  });
});
