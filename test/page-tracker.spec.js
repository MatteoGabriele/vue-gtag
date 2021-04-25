import { mount, createLocalVue } from "@vue/test-utils";
import flushPromises from "flush-promises";
import VueRouter from "vue-router";
import VueGtag from "@/index";
import * as api from "@/api";
import * as utils from "@/utils";

jest.mock("@/api");

const UA_ID = "UA-123456-7";

describe("page-tracker", () => {
  let router;

  beforeEach(() => {
    router = new VueRouter({
      mode: "history",
      routes: [
        { name: "home", path: "/" },
        { name: "about", path: "/about" },
      ],
    });

    jest.spyOn(utils, "load").mockResolvedValue();
  });

  test("wait router ready before start tracking", async () => {
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

    mount(
      {
        render: (h) => h("router-view"),
      },
      {
        router,
        localVue,
      }
    );

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

    mount(
      {
        render: (h) => h("router-view"),
      },
      {
        router,
        localVue,
      }
    );

    await flushPromises();

    expect(api.config).toHaveBeenCalled();
  });
});
