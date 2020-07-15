import customMap from "@/api/custom-map";
import config from "@/api/config";

jest.mock("@/api/config");

describe("api/custom", () => {
  it("should be called with this parameters", () => {
    customMap({ foo: "bar" });
    expect(config).toHaveBeenCalledWith({
      custom_map: { foo: "bar" },
    });
  });
});
