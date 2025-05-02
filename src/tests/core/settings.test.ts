import { getSettings, updateSettings } from "@/core/settings";

describe("config", () => {
  it("should return the configuration", () => {
    expect(getSettings()).toEqual({
      resource: {
        url: "https://www.googletagmanager.com/gtag/js",
        inject: true,
      },
      dataLayerName: "dataLayer",
      gtagName: "gtag",
      groupName: "default",
      initMode: "auto",
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
