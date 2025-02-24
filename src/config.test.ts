import { getSettings, updateSettings } from "@/config";

describe("config", () => {
  it("should return the configuration", () => {
    expect(getSettings()).toEqual({
      enabled: false,
      resourceUrl: "https://www.googletagmanager.com/gtag/js",
      resourceUrlPreconnect: "https://www.googletagmanager.com",
      resourceDeferred: false,
      dataLayerName: "dataLayer",
      gtagName: "gtag",
    });
  });

  it("should update the default configuration", () => {
    updateSettings({ enabled: true });

    expect(getSettings()).toEqual(expect.objectContaining({ enabled: true }));
  });
});
