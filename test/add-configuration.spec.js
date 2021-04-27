import { createLocalVue } from "@vue/test-utils";
import VueGtag from "@/index";
import * as api from "@/api";

const UA_ID = "UA-123456-1";
const UA_ID_2 = "UA-123456-2";

jest.mock("@/api");

describe("add-configuration", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("fires a configuration for the main domain", () => {
    const localVue = createLocalVue();

    localVue.use(VueGtag, {
      config: {
        id: UA_ID,
      },
    });

    expect(api.query).toHaveBeenNthCalledWith(1, "config", UA_ID, {
      send_page_view: false,
    });
    expect(api.query).toHaveBeenCalledTimes(1);
  });

  test("fires a configuration for multiple domains", () => {
    const localVue = createLocalVue();

    localVue.use(VueGtag, {
      includes: [
        {
          id: UA_ID_2,
          params: {
            userId: 2,
          },
        },
      ],
      config: {
        id: UA_ID,
      },
    });

    expect(api.query).toHaveBeenNthCalledWith(1, "config", UA_ID, {
      send_page_view: false,
    });

    expect(api.query).toHaveBeenNthCalledWith(2, "config", UA_ID_2, {
      send_page_view: false,
      userId: 2,
    });

    expect(api.query).toHaveBeenCalledTimes(2);
  });
});
