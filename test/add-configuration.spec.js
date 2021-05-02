import { createLocalVue } from "@vue/test-utils";
import VueGtag from "@/index";
import * as api from "@/api";

jest.mock("@/api");

describe("add-configuration", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("fires a configuration for the main domain", () => {
    const localVue = createLocalVue();

    localVue.use(VueGtag, {
      config: {
        id: 1,
      },
    });

    expect(api.query).toHaveBeenNthCalledWith(1, "config", 1, {
      send_page_view: false,
    });
    expect(api.query).toHaveBeenCalledTimes(1);
  });

  test("fires a configuration for multiple domains", () => {
    const localVue = createLocalVue();

    localVue.use(VueGtag, {
      includes: [
        {
          id: 2,
          params: {
            userId: 2,
          },
        },
      ],
      config: {
        id: 1,
      },
    });

    expect(api.query).toHaveBeenNthCalledWith(1, "config", 1, {
      send_page_view: false,
    });

    expect(api.query).toHaveBeenNthCalledWith(2, "config", 2, {
      send_page_view: false,
      userId: 2,
    });

    expect(api.query).toHaveBeenCalledTimes(2);
  });
});
