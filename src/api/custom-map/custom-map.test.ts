import { resetSettings, updateSettings } from "../../core/settings";
import { query } from "../query";
import { customMap } from "./custom-map";

vi.mock("../query");

describe("custom-map", () => {
  beforeEach(resetSettings);

  it("should use the custom_map configuration", () => {
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
