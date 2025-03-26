import * as api from "@/api/index";
import { addGtag } from "@/core/add-gtag";
import { resetSettings } from "@/core/settings";
import { createApp } from "vue";
import { createGtag, addGtag as initialize } from "./index";

vi.mock("@/core/add-gtag");

describe("index", () => {
  beforeEach(resetSettings);

  it("should install the plugin", () => {
    createGtag({ tagId: "UA-123456789" });
    expect(addGtag).toHaveBeenCalled();
  });

  it("should use manual installation", () => {
    createGtag({ tagId: "UA-123456789", initMode: "manual" });

    expect(addGtag).not.toHaveBeenCalled();

    initialize();

    expect(addGtag).toHaveBeenCalled();
  });

  it("should install global properties", () => {
    const app = createApp({});
    const gtag = createGtag({ tagId: "UA-123456789" });

    app.use(gtag);

    expect(app.config.globalProperties.$gtag).toEqual(api);
  });
});
