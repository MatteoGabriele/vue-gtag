import { createApp } from "vue";
import disable from "src/api/disable";
import VueGtag from "src/index";

describe("disable", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("turns off tracking", () => {
    const app = createApp();

    app.use(VueGtag, {
      config: {
        id: 1,
      },
    });

    disable();

    expect(window["ga-disable-1"]).toEqual(true);
  });

  test("turns on tracking", () => {
    const app = createApp();

    app.use(VueGtag, {
      config: {
        id: 1,
      },
    });

    disable(false);

    expect(window["ga-disable-1"]).toEqual(false);
  });

  test("turns off tracking for multiple domains", () => {
    const app = createApp();

    app.use(VueGtag, {
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
    const app = createApp();

    app.use(VueGtag, {
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
