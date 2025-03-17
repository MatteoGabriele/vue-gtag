import { createRouter, createWebHistory } from "vue-router";
import addRouterTracking from "./add-router-tracking";
import { resetSettings, updateSettings } from "./settings";
import trackRoute from "./track-route";

vi.mock("./track-route");

const routes = [
  { path: "/", component: { template: "<div />" } },
  { path: "/about", component: { template: "<div />" } },
];

describe("add-router-tracking", () => {
  beforeEach(resetSettings);

  it("should track once the router is ready", async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes,
    });

    vi.spyOn(router, "isReady").mockResolvedValue();

    updateSettings({ pageTracker: { router } });

    await addRouterTracking();

    expect(trackRoute).toHaveBeenCalledWith(
      expect.objectContaining({
        path: "/",
      }),
    );
  });

  it("should track after route change", async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes,
    });

    vi.spyOn(router, "isReady").mockResolvedValue();

    updateSettings({ pageTracker: { router } });

    await addRouterTracking();

    await router.push("/about");

    expect(trackRoute).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        path: "/about",
      }),
    );
  });

  it("should track identical paths", async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes,
    });

    vi.spyOn(router, "isReady").mockResolvedValue();

    updateSettings({ pageTracker: { router } });

    await addRouterTracking();

    await router.push("/about");
    await router.push("/about");

    expect(trackRoute).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        path: "/",
      }),
    );

    expect(trackRoute).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        path: "/about",
      }),
    );

    expect(trackRoute).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        path: "/about",
      }),
    );
  });

  it("should skip tracking identical paths", async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes,
    });

    vi.spyOn(router, "isReady").mockResolvedValue();

    updateSettings({
      pageTracker: {
        router,
        skipSamePath: true,
      },
    });

    await addRouterTracking();

    await router.push("/about");
    await router.push("/about");

    expect(trackRoute).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        path: "/",
      }),
    );

    expect(trackRoute).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        path: "/about",
      }),
    );

    expect(trackRoute).toHaveBeenCalledTimes(2);
  });
});
