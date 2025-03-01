import query from "@/gtag/query";
import { createRouter, createWebHistory } from "vue-router";
import addRouterTracking from "./add-router-tracking";
import { resetSettings, updateSettings } from "./settings";

vi.mock("@/gtag/query");

const routes = [
  { path: "/", component: { template: "<div />" } },
  { path: "/about", component: { template: "<div />" } },
  { path: "/contact", component: { template: "<div />" } },
];

describe("add-router-tracking", () => {
  beforeEach(resetSettings);

  it("should track once the router is ready", async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes,
    });

    vi.spyOn(router, "isReady").mockResolvedValue();

    updateSettings({ router });

    await addRouterTracking();

    expect(query).toHaveBeenCalledWith("event", "page_view", {
      page_path: "/",
    });
  });

  it("should track after route change", async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes,
    });

    vi.spyOn(router, "isReady").mockResolvedValue();

    updateSettings({ router });

    await addRouterTracking();

    await router.push("/about");

    expect(query).toHaveBeenNthCalledWith(2, "event", "page_view", {
      page_path: "/about",
    });
  });

  it("should avoid tracking excluded routes", async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes,
    });

    vi.spyOn(router, "isReady").mockResolvedValue();

    updateSettings({
      router,
      excludedRoutes: [{ path: "/contact" }],
    });

    await addRouterTracking();

    await router.push("/contact");
    await router.push("/about");

    expect(query).toHaveBeenNthCalledWith(1, "event", "page_view", {
      page_path: "/",
    });

    expect(query).toHaveBeenNthCalledWith(2, "event", "page_view", {
      page_path: "/about",
    });

    expect(query).toHaveBeenCalledTimes(2);
  });

  it("should avoid tracking the landing page if excluded", async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes,
    });

    vi.spyOn(router, "isReady").mockResolvedValue();

    updateSettings({
      router,
      excludedRoutes: [{ path: "/" }],
    });

    await addRouterTracking();

    expect(query).not.toHaveBeenCalled();
  });

  it("should fire a callback before tracking", async () => {
    const spyOnBeforeTrack = vi.fn();

    const router = createRouter({
      history: createWebHistory(),
      routes,
    });

    vi.spyOn(router, "isReady").mockResolvedValue();

    updateSettings({
      router,
      onBeforeTrack: spyOnBeforeTrack,
    });

    await addRouterTracking();

    await router.push("/about");

    expect(spyOnBeforeTrack).toHaveBeenCalled();
  });

  it("should fire a callback after tracking", async () => {
    const spyOnAfterTrack = vi.fn();

    const router = createRouter({
      history: createWebHistory(),
      routes,
    });

    vi.spyOn(router, "isReady").mockResolvedValue();

    updateSettings({
      router,
      onAfterTrack: spyOnAfterTrack,
    });

    await addRouterTracking();

    await router.push("/about");

    expect(spyOnAfterTrack).toHaveBeenCalled();
  });
});
