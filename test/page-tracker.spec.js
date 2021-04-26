import { mount, createLocalVue } from "@vue/test-utils";
import flushPromises from "flush-promises";
import VueRouter from "vue-router";
import VueGtag from "@/index";
import * as api from "@/api";
import * as utils from "@/utils";

jest.mock("@/api");

const UA_ID = "UA-123456-7";
const App = { render: (h) => h("router-view") };
const Home = { render: (h) => h("div", null, "home page") };
const About = { render: (h) => h("div", null, "about page") };

describe("page-tracker", () => {
  let router;

  beforeEach(() => {
    router = new VueRouter({
      mode: "abstract",
      routes: [
        { name: "home", path: "/", component: Home },
        { name: "about", path: "/about", component: About },
      ],
    });

    jest.spyOn(utils, "load").mockResolvedValue();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("waits router ready before start tracking", async () => {
    const localVue = createLocalVue();

    localVue.use(VueRouter);

    jest.spyOn(router, "onReady").mockResolvedValue();

    localVue.use(
      VueGtag,
      {
        config: {
          id: UA_ID,
        },
      },
      router
    );

    mount(App, { router, localVue });

    await flushPromises();

    expect(router.onReady).toHaveBeenCalledBefore(api.config);
  });

  test("fires the config hit", async () => {
    const localVue = createLocalVue();

    localVue.use(VueRouter);

    localVue.use(
      VueGtag,
      {
        config: {
          id: UA_ID,
        },
      },
      router
    );

    mount(App, { router, localVue });

    await flushPromises();

    router.push("/");

    expect(api.config).toHaveBeenCalledWith({
      send_page_view: false,
    });

    expect(api.pageview).toHaveBeenCalledWith({
      page_title: "home",
      page_path: "/",
      page_location: "http://localhost/",
    });

    expect(api.pageview).toHaveBeenCalledTimes(1);
    expect(api.config).toHaveBeenCalledTimes(1);
  });

  test("tracks with screenview instead of pageview", async () => {
    const localVue = createLocalVue();

    localVue.use(VueRouter);

    localVue.use(
      VueGtag,
      {
        pageTrackerScreenviewEnabled: true,
        appName: "MyApp",
        config: {
          id: UA_ID,
        },
      },
      router
    );

    mount(App, { router, localVue });

    router.push("/");

    await flushPromises();

    expect(api.screenview).toHaveBeenCalledWith({
      app_name: "MyApp",
      screen_name: "home",
    });
    expect(api.screenview).toHaveBeenCalledTimes(1);
  });

  test("tracks using fullPath router property instead of path", async () => {
    const localVue = createLocalVue();

    localVue.use(VueRouter);

    localVue.use(
      VueGtag,
      {
        pageTrackerUseFullPath: true,
        config: {
          id: UA_ID,
        },
      },
      router
    );

    mount(App, { router, localVue });

    router.push({ name: "about", query: { foo: "bar" } });

    await flushPromises();

    expect(api.pageview).toHaveBeenCalledWith(
      expect.objectContaining({
        page_path: "/about?foo=bar",
      })
    );
  });

  describe("pageTrackerTemplate", () => {
    test("tracks pageview", async () => {
      const localVue = createLocalVue();

      localVue.use(VueRouter);

      localVue.use(
        VueGtag,
        {
          pageTrackerTemplate: (to) => ({
            foo: to.name,
            bar: to.path,
          }),
          config: {
            id: UA_ID,
          },
        },
        router
      );

      mount(App, { router, localVue });

      router.push("/");

      await flushPromises();

      expect(api.pageview).toHaveBeenCalledWith({
        foo: "home",
        bar: "/",
      });

      expect(api.pageview).toHaveBeenCalledTimes(1);
    });

    test("tracks screenview", async () => {
      const localVue = createLocalVue();

      localVue.use(VueRouter);

      localVue.use(
        VueGtag,
        {
          pageTrackerScreenviewEnabled: true,
          pageTrackerTemplate: (to) => ({
            foo: to.name,
            bar: to.path,
          }),
          config: {
            id: UA_ID,
          },
        },
        router
      );

      mount(App, { router, localVue });

      router.push("/");

      await flushPromises();

      expect(api.screenview).toHaveBeenCalledWith({
        foo: "home",
        bar: "/",
      });

      expect(api.screenview).toHaveBeenCalledTimes(1);
    });
  });
});
