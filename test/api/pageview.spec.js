import { createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import pageview from "@/api/pageview";
import event from "@/api/event";
import flushPromises from "flush-promises";

jest.mock("@/api/event");

describe("pageview", () => {
  const { location } = window;

  beforeAll(() => {
    delete window.location;

    window.location = {
      href: "window_location_href_value",
    };
  });

  afterAll(() => {
    window.location = location;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("pass a page as string", () => {
    pageview("/");

    expect(event).toHaveBeenCalledWith("page_view", {
      send_page_view: true,
      page_path: "/",
      page_location: "window_location_href_value",
    });
  });

  test("pass page as an object", () => {
    pageview({
      page_path: "/about",
      page_title: "about",
      page_location: "window_location_href_value",
    });

    expect(event).toHaveBeenCalledWith("page_view", {
      send_page_view: true,
      page_title: "about",
      page_path: "/about",
      page_location: "window_location_href_value",
    });
  });

  test("pass page as a route", async () => {
    const localVue = createLocalVue();
    const router = new VueRouter({
      mode: "abstract",
      routes: [{ name: "home", path: "/" }],
    });

    localVue.use(VueRouter);

    router.push("/");

    await flushPromises();

    pageview(router.currentRoute);

    expect(event).toHaveBeenCalledWith("page_view", {
      send_page_view: true,
      page_title: "home",
      page_path: "/",
      page_location: "window_location_href_value",
    });
  });
});
