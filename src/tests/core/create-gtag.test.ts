import * as api from "@/api/index";
import { addGtag } from "@/core/add-gtag";
import { createGtag } from "@/core/create-gtag";
import { resetSettings } from "@/core/settings";
import { createApp } from "vue";

vi.mock("@/core/add-gtag");

describe("createGtag", () => {
  beforeEach(resetSettings);

  it("should initialize gtag", () => {
    createGtag({ tagId: "UA-123456789" });
    expect(addGtag).toHaveBeenCalled();
  });

  it("should add global properties", () => {
    const app = createApp({});
    const gtag = createGtag({ tagId: "UA-123456789" });

    app.use(gtag);

    expect(app.config.globalProperties.$gtag).toEqual(api);
  });

  it("should avoid initialization using initMode in manual mode", () => {
    createGtag({ tagId: "UA-123456789", initMode: "manual" });
    expect(addGtag).not.toHaveBeenCalled();
  });
});
