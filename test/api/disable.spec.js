import { createLocalVue } from "@vue/test-utils";
import disable from "@/api/disable";
import VueGtag from "@/index";

describe("disable", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("turns off tracking", () => {
    const localVue = createLocalVue();

    localVue.use(VueGtag, {
      config: {
        id: 1,
      },
    });

    disable();

    expect(window["ga-disable-1"]).toEqual(true);
  });

  test("turns on tracking", () => {
    const localVue = createLocalVue();

    localVue.use(VueGtag, {
      config: {
        id: 1,
      },
    });

    disable(false);

    expect(window["ga-disable-1"]).toEqual(false);
  });

  test("turns off tracking for multiple domains", () => {
    const localVue = createLocalVue();

    localVue.use(VueGtag, {
      includes: [{ id: 2 }, { id: 3 }],
      config: {
        id: 1,
      },
    });

    disable();

    expect(window["ga-disable-1"]).toEqual(true);
    expect(window["ga-disable-2"]).toEqual(true);
    expect(window["ga-disable-3"]).toEqual(true);
  });

  test("turns on tracking for multiple domains", () => {
    const localVue = createLocalVue();

    localVue.use(VueGtag, {
      includes: [{ id: 2 }, { id: 3 }],
      config: {
        id: 1,
      },
    });

    disable(false);

    expect(window["ga-disable-1"]).toEqual(false);
    expect(window["ga-disable-2"]).toEqual(false);
    expect(window["ga-disable-3"]).toEqual(false);
  });
});
