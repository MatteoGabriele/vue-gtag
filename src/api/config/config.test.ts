import { updateSettings } from "../../core/settings";
import { query } from "../query";
import { config } from "./config";

vi.mock("../query");

describe("config", () => {
  it("should fire the config event", () => {
    updateSettings({
      tagId: "UA-1",
    });

    config({ send_page_view: false });

    expect(query).toHaveBeenCalledWith("config", "UA-1", {
      send_page_view: false,
    });
  });

  it("should fire multiple config event", () => {
    updateSettings({
      tagId: "UA-1",
      additionalAccounts: [
        {
          tagId: "UA-2",
        },
      ],
    });

    config({ screen_name: "app" });

    expect(query).toHaveBeenNthCalledWith(1, "config", "UA-1", {
      screen_name: "app",
    });

    expect(query).toHaveBeenNthCalledWith(2, "config", "UA-2", {
      screen_name: "app",
    });
  });
});
