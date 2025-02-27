import { getSettings } from "@/settings";
import query from "./query";

describe("query", () => {
  it("should pass events to the gtag library", () => {
    const { dataLayerName } = getSettings();

    query("config", "UA-12345678", { send_page_view: true });

    expect(window[dataLayerName]).toEqual([
      [
        "config",
        "UA-12345678",
        {
          send_page_view: true,
        },
      ],
    ]);
  });
});
