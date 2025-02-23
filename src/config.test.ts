import { getConfig, updateConfig } from "@/config";

describe("config", () => {
  it("should return the configuration", () => {
    expect(getConfig()).toEqual({
      enabled: false,
      resourceUrl: "https://www.googletagmanager.com/gtag/js",
      resourceUrlPreconnect: "https://www.googletagmanager.com",
      resourceDeferred: false,
      dataLayerName: "dataLayer",
      gtagName: "gtag",
    });
  });

  it("should update the default configuration", () => {
    updateConfig({ enabled: true });

    expect(getConfig()).toEqual(expect.objectContaining({ enabled: true }));
  });
});
