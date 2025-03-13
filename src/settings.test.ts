import { getSettings, updateSettings } from "./settings";

describe("config", () => {
  it("should return the configuration", () => {
    expect(getSettings()).toEqual({
      resourceUrl: "https://www.googletagmanager.com/gtag/js",
      resourceUrlPreconnect: "https://www.googletagmanager.com",
      resourceDeferred: false,
      dataLayerName: "dataLayer",
      gtagName: "gtag",
      groupName: "default",
    });
  });

  it("should update the default configuration", () => {
    updateSettings({
      tagId: "UA-1234567",
      gtagName: "foo",
    });

    expect(getSettings()).toEqual(
      expect.objectContaining({
        tagId: "UA-1234567",
        gtagName: "foo",
      }),
    );
  });
});
