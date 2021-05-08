import { createApp } from "vue";
import VueGtag from "@/index";
import screenview from "@/api/screenview";
import event from "@/api/event";

jest.mock("@/api/event");

describe("screenview", () => {
  afterEach(() => {
    jest.clearAllMocks();
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
