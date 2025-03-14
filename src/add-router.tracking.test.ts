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
});
