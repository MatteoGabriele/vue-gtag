import { createApp } from "vue";
import * as api from "./api/index";
import addGtag from "./core/add-gtag";
import { createGtag } from "./index";

vi.mock("./core/add-gtag");

describe("index", () => {
  it("should install the plugin", () => {
    createGtag({ tagId: "UA-123456789" });
    expect(addGtag).toHaveBeenCalled();
  });

  it("should install global properties", () => {
    const app = createApp({});
    const gtag = createGtag({ tagId: "UA-123456789" });

    app.use(gtag);

    expect(app.config.globalProperties.$gtag).toEqual(api);
  });
});
