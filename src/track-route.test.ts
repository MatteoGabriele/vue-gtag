import query from "@/gtag/query";
import { resetSettings, updateSettings } from "@/settings";
import trackRoute from "@/track-route";
import { type Router, createRouter, createWebHistory } from "vue-router";

vi.mock("@/gtag/query");

describe("track-route", () => {
  let router: Router;

  beforeEach(async () => {
    resetSettings();

    router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: "/",
          name: "home",
          component: { template: "<div />" },
        },
        {
          path: "/about",
          name: "about",
          component: { template: "<div />" },
        },
      ],
    });

    vi.spyOn(router, "isReady").mockResolvedValue();

    await router.isReady();
  });

  it("should track pageviews", async () => {
    updateSettings({
      pageTracker: {
        appName: "MyApp",
        useScreenview: true,
      },
    });

    await router.isReady();
    await router.push("/about");

    trackRoute(router.currentRoute.value);

    expect(query).toHaveBeenCalledWith("event", "screen_view", {
      screen_name: "about",
      app_name: "MyApp",
    });
  });

  it("should track screenviews", async () => {
    await router.isReady();
    await router.push("/about");

    trackRoute(router.currentRoute.value);

    expect(query).toHaveBeenCalledWith("event", "page_view", {
      page_path: "/about",
    });
  });

  it("should avoid tracking excluded routes", async () => {
    updateSettings({
      pageTracker: {
        exclude: [{ path: "/" }],
      },
    });

    await router.isReady();
    await router.push("/");

    trackRoute(router.currentRoute.value);

    expect(query).not.toHaveBeenCalled();
  });

  it("should fire a callback before tracking", async () => {
    const spyOnBeforeTrack = vi.fn();

    updateSettings({
      pageTracker: {
        onBeforeTrack: spyOnBeforeTrack,
      },
    });

    await router.isReady();
    await router.push("/");

    trackRoute(router.currentRoute.value);

    expect(spyOnBeforeTrack).toHaveBeenCalled();
  });

  it("should fire a callback after tracking", async () => {
    const spyOnAfterTrack = vi.fn();

    updateSettings({
      pageTracker: {
        onAfterTrack: spyOnAfterTrack,
      },
    });

    await router.isReady();
    await router.push("/");

    trackRoute(router.currentRoute.value);

    expect(spyOnAfterTrack).toHaveBeenCalled();
  });

  it("should track useing a custom template", async () => {});
});
