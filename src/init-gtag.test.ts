import addConfiguration from "@/add-configuration";
import addRouterTracking from "@/add-router-tracking";
import initGtag from "@/init-gtag";
import { resetSettings, updateSettings } from "@/settings";
import * as utils from "@/utils";
import { createRouter, createWebHistory } from "vue-router";

vi.mock("@/utils");
vi.mock("@/add-configuration");
vi.mock("@/add-router-tracking");

describe("initGtag", () => {
  beforeEach(resetSettings);

  it("should download the gtag.js library", async () => {
    updateSettings({
      tagId: "UA-12345678",
    });

    await initGtag();

    const resource = "https://www.googletagmanager.com/gtag/js";
    const preconnect = "https://www.googletagmanager.com";
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
      resourceUrl: "custom_resource_url",
    });

    await initGtag();

    const resource = "custom_resource_url";
    const preconnect = "https://www.googletagmanager.com";
    const id = "UA-12345678";
    const dataLayer = "dataLayer";
    const url = `${resource}?id=${id}&l=${dataLayer}`;

    expect(utils.injectScript).toHaveBeenCalledWith(url, {
      preconnectOrigin: preconnect,
      defer: false,
    });
  });

  it("should fire callback when plugin is ready", async () => {
    const spyOnReady = vi.fn();

    updateSettings({
      tagId: "UA-12345678",
      onReady: spyOnReady,
    });

    await initGtag();

    expect(spyOnReady).toHaveBeenCalled();
  });

  it("should fire callback when downloading library throws an error", async () => {
    const spyOnError = vi.fn();

    vi.spyOn(utils, "injectScript").mockRejectedValue(new Error());

    updateSettings({
      tagId: "UA-12345678",
      onError: spyOnError,
    });

    await initGtag();

    expect(spyOnError).toHaveBeenCalled();
  });

  it("should add initial gtag config call", async () => {
    updateSettings({
      tagId: "UA-12345678",
    });

    await initGtag();

    expect(addConfiguration).toHaveBeenCalled();
  });

  it("should initialize router tracking", async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [{ path: "/", component: { template: "<div />" } }],
    });

    updateSettings({
      tagId: "UA-12345678",
      router,
    });

    await initGtag();

    expect(addRouterTracking).toHaveBeenCalled();
    expect(addConfiguration).not.toHaveBeenCalled();
  });

  it("should not bootstrap gtag if tagId is missing", async () => {
    await initGtag();

    expect(addConfiguration).not.toHaveBeenCalled();
  });
});
