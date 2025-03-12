import customMap from "@/api/custom-map";
import query from "@/api/query";
import { resetSettings, updateSettings } from "@/settings";

vi.mock("@/api/query");

describe("exception", () => {
  beforeEach(resetSettings);

  it("should use the exception event", () => {
    updateSettings({
      tagId: "UA-12345678",
    });

    customMap({ dimension1: "my_username" });

    expect(query).toHaveBeenCalledWith("config", "UA-12345678", {
      custom_map: {
        dimension1: "my_username",
      },
    });
  });
});
