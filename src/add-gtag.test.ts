import { createRouter, createWebHistory } from "vue-router";
import addConfiguration from "./add-configuration";
import addGtag from "./add-gtag";
import addRouterTracking from "./add-router-tracking";
import { resetSettings, updateSettings } from "./settings";
import * as utils from "./utils";

vi.mock("./utils", async () => ({
  ...(await vi.importActual("./utils.ts")),
  injectScript: vi.fn(),
}));

vi.mock("./add-configuration");
vi.mock("./add-router-tracking");
vi.mock("./api/query");

describe("addGtag", () => {
  beforeEach(resetSettings);

  it("should download the gtag.js library", async () => {
    updateSettings({
      tagId: "UA-12345678",
    });

    await addGtag();

    const resource = "https://www.googletagmanager.com/gtag/js";
    const preconnect = false;
    const id = "UA-12345678";
    const dataLayer = "dataLayer";
    const url = `${resource}?id=${id}&l=${dataLayer}`;

    expect(utils.injectScript).toHaveBeenCalledWith(url, {
      preconnectOrigin: preconnect,
      defer: false,
    });
  });

  it("should download a custom version of the gtag.js library", async () => {
    updateSettings({
      tagId: "UA-12345678",
      resource: {
        url: "custom_resource_url",
      },
    });

    await addGtag();

    const resource = "custom_resource_url";
    const id = "UA-12345678";
    const dataLayer = "dataLayer";
    const url = `${resource}?id=${id}&l=${dataLayer}`;

    expect(utils.injectScript).toHaveBeenCalledWith(url, {
      preconnectOrigin: false,
      defer: false,
    });
  });

  it("should fire callback when plugin is ready", async () => {
    const spyOnReady = vi.fn();

    updateSettings({
      tagId: "UA-12345678",
      onReady: spyOnReady,
    });

    await addGtag();

    expect(spyOnReady).toHaveBeenCalled();
  });

  it("should fire callback when downloading library throws an error", async () => {
    const spyOnError = vi.fn();

    vi.spyOn(utils, "injectScript").mockRejectedValue(new Error());

    updateSettings({
      tagId: "UA-12345678",
      onError: spyOnError,
    });

    await addGtag();

    expect(spyOnError).toHaveBeenCalled();
  });

  it("should add initial gtag config call", async () => {
    updateSettings({
      tagId: "UA-12345678",
    });

    await addGtag();

    expect(addConfiguration).toHaveBeenCalled();
  });

  it("should initialize router tracking", async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [{ path: "/", component: { template: "<div />" } }],
    });

    updateSettings({
      tagId: "UA-12345678",
      pageTracker: {
        router,
      },
    });

    await addGtag();

    expect(addRouterTracking).toHaveBeenCalled();
    expect(addConfiguration).toHaveBeenCalled();
  });

  it("should not bootstrap gtag if tagId is missing", async () => {
    await addGtag();

    expect(addConfiguration).not.toHaveBeenCalled();
  });

  it("should not inject the script in case the user has it already", async () => {
    updateSettings({
      tagId: "UA-12345678",
      useCustomScript: true,
    });

    await addGtag();

    expect(utils.injectScript).not.toHaveBeenCalled();
  });

  it("should fire the onReady callback even if using custom script loader", async () => {
    const spyOnReady = vi.fn();

    updateSettings({
      tagId: "UA-12345678",
      useCustomScript: true,
      onReady: spyOnReady,
    });

    await addGtag();

    expect(spyOnReady).toHaveBeenCalled();
  });
});
