import event from "@/api/event";
import screenview from "@/api/screenview";
import VueGtag from "@/index";
import { createApp } from "vue";

vi.mock("@/api/event");

describe("screenview", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("fires a screenview as string", () => {
    const app = createApp();

    app.use(VueGtag, {
      appName: "MyApp",
      config: {
        id: 1,
      },
    });

    screenview("home");

    expect(event).toHaveBeenCalledWith("screen_view", {
      screen_name: "home",
      app_name: "MyApp",
    });
  });

  test("fires a screenview as object", () => {
    const app = createApp();

    app.use(VueGtag, {
      appName: "MyApp",
      config: {
        id: 1,
      },
    });

    screenview({
      screen_name: "home",
    });

    expect(event).toHaveBeenCalledWith("screen_view", {
      screen_name: "home",
      app_name: "MyApp",
    });
  });

  test("uses a custom app_name", () => {
    const app = createApp();

    app.use(VueGtag, {
      appName: "MyApp",
      config: {
        id: 1,
      },
    });

    screenview({
      screen_name: "home",
      app_name: "my_custom_app_name",
    });

    expect(event).toHaveBeenCalledWith("screen_view", {
      screen_name: "home",
      app_name: "my_custom_app_name",
    });
  });

  test("does not fire when no parameters are passed", () => {
    screenview();

    expect(event).not.toHaveBeenCalled();
  });
});
