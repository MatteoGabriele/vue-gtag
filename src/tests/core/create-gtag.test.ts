import { config } from "@/api/config";
import { consent, consentDeniedAll, consentGrantedAll } from "@/api/consent";
import { customMap } from "@/api/custom-map";
import { ecommerce } from "@/api/ecommerce";
import { event } from "@/api/event";
import { exception } from "@/api/exception";
import { linker } from "@/api/linker";
import { optIn, optOut } from "@/api/opt";
import { pageview } from "@/api/pageview";
import { query } from "@/api/query";
import { screenview } from "@/api/screenview";
import { set } from "@/api/set";
import { time } from "@/api/time";
import { addGtag } from "@/core/add-gtag";
import { createGtag } from "@/core/create-gtag";
import { resetSettings } from "@/core/settings";
import { createApp } from "vue";

vi.mock("@/core/add-gtag");

const api = {
  config,
  consent,
  consentDeniedAll,
  consentGrantedAll,
  customMap,
  ecommerce,
  event,
  exception,
  linker,
  optIn,
  optOut,
  pageview,
  screenview,
  set,
  time,
  query,
};

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
