import { getSettings } from "../core/settings";
import query from "./query";

describe("query", () => {
  it("should pass events to the gtag library", () => {
    const { dataLayerName } = getSettings();

    query("config", "UA-12345678", { send_page_view: true });

    expect(window[dataLayerName][0][0]).toEqual("config");
    expect(window[dataLayerName][0][1]).toEqual("UA-12345678");
    expect(window[dataLayerName][0][2]).toEqual({
      send_page_view: true,
    });
  });
});
