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

  it("should track screenviews", async () => {
    updateSettings({
      pageTracker: {
        router,
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

  it("should track pageviews", async () => {
    await router.isReady();
    await router.push("/about");

    trackRoute(router.currentRoute.value);

    expect(query).toHaveBeenCalledWith("event", "page_view", {
      page_path: "/about",
      page_location: "http://localhost:3000/about",
      page_title: "about",
      send_page_view: true,
    });
  });

  it("should avoid tracking excluded routes using path", async () => {
    updateSettings({
      pageTracker: {
        router,
        exclude: [{ path: "/" }],
      },
    });

    await router.isReady();
    await router.push("/");

    trackRoute(router.currentRoute.value);

    expect(query).not.toHaveBeenCalled();
  });

  it("should avoid tracking excluded routes using name", async () => {
    updateSettings({
      pageTracker: {
        router,
        exclude: [{ name: "home" }],
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
        router,
        onBeforeTrack: spyOnBeforeTrack,
      },
    });

    await router.isReady();
    await router.push("/");

    trackRoute(router.currentRoute.value);

    expect(spyOnBeforeTrack).toHaveBeenCalledWith(router.currentRoute.value);
  });

  it("should fire a callback after tracking", async () => {
    const spyOnAfterTrack = vi.fn();

    updateSettings({
      pageTracker: {
        router,
        onAfterTrack: spyOnAfterTrack,
      },
    });

    await router.isReady();
    await router.push("/");

    trackRoute(router.currentRoute.value);

    expect(spyOnAfterTrack).toHaveBeenCalledWith(router.currentRoute.value);
  });

  it("should track using a custom template", async () => {
    updateSettings({
      pageTracker: {
        router,
        template: {
          page_path: "/custom-template-path",
        },
      },
    });

    await router.isReady();
    await router.push("/");

    trackRoute(router.currentRoute.value);

    expect(query).toHaveBeenCalledWith("event", "page_view", {
      page_path: "/custom-template-path",
      page_location: "http://localhost:3000/",
      send_page_view: true,
    });
  });

  it("should track using a custom template function", async () => {
    updateSettings({
      pageTracker: {
        router,
        template: (to) => ({
          page_path: `${to.path}_custom-template-path`,
        }),
      },
    });

    await router.isReady();
    await router.push("/about");

    trackRoute(router.currentRoute.value);

    expect(query).toHaveBeenCalledWith("event", "page_view", {
      page_path: "/about_custom-template-path",
      page_location: "http://localhost:3000/about",
      send_page_view: true,
    });
  });

  it("should track screen views using a custom template", async () => {
    updateSettings({
      pageTracker: {
        router,
        useScreenview: true,
        template: {
          screen_name: "about",
        },
      },
    });

    await router.isReady();
    await router.push("/");

    trackRoute(router.currentRoute.value);

    expect(query).toHaveBeenCalledWith("event", "screen_view", {
      screen_name: "about",
    });
  });
});
