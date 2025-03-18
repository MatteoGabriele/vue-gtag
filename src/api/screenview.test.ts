import { type Router, createRouter, createWebHistory } from "vue-router";
import { resetSettings, updateSettings } from "../settings";
import query from "./query";
import screenview from "./screenview";

vi.mock("./query");

describe("screenview", () => {
  let router: Router;

  beforeEach(async () => {
    resetSettings();

    router = createRouter({
      history: createWebHistory("/base-path"),
      routes: [
        { path: "/no-name", component: { template: "<div />" } },
        { path: "/about", name: "about", component: { template: "<div />" } },
      ],
    });

    vi.spyOn(router, "isReady").mockResolvedValue();

    await router.isReady();
    await router.push({ name: "about", query: { id: 1 }, hash: "#title" });
  });

  it("should track screenview with a string", async () => {
    screenview("about");

    expect(query).toHaveBeenCalledWith("event", "screen_view", {
      screen_name: "about",
    });
  });

  it("should track screenview with the app_name", async () => {
    updateSettings({
      pageTracker: {
        router,
        appName: "myapp",
      },
    });

    screenview(router.currentRoute.value);

    expect(query).toHaveBeenCalledWith(
      "event",
      "screen_view",
      expect.objectContaining({
        app_name: "myapp",
      }),
    );
  });

  it("should track screenview with a route instance and name", async () => {
    screenview(router.currentRoute.value);

    expect(query).toHaveBeenCalledWith("event", "screen_view", {
      screen_name: "about",
    });
  });

  it("should track screenview with a route instance and page_path only", async () => {
    await router.push("/no-name");
    screenview(router.currentRoute.value);

    expect(query).toHaveBeenCalledWith("event", "screen_view", {
      screen_name: "/no-name",
    });
  });

  it("should track screenview with app_name", () => {
    screenview({
      app_name: "MyApp",
      screen_name: "about",
    });

    expect(query).toHaveBeenCalledWith("event", "screen_view", {
      app_name: "MyApp",
      screen_name: "about",
    });
  });
});
