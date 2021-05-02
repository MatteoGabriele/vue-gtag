import {
  screenview,
  pageview,
  optOut,
  optIn,
  config,
  event,
  query,
  exception,
  linker,
  time,
  set,
  refund,
  purchase,
  customMap,
  bootstrap,
  setOptions,
  setRouter,
  addRoutesTracker,
} from "@/index";

describe("exports", () => {
  test("setRouter", () => {
    expect(setRouter).toBeDefined();
  });

  test("setOptions", () => {
    expect(setOptions).toBeDefined();
  });

  test("bootstrap", () => {
    expect(bootstrap).toBeDefined();
  });

  test("api", () => {
    expect(event).toBeDefined();
    expect(query).toBeDefined();
    expect(config).toBeDefined();
    expect(optOut).toBeDefined();
    expect(optIn).toBeDefined();
    expect(pageview).toBeDefined();
    expect(screenview).toBeDefined();
    expect(exception).toBeDefined();
    expect(linker).toBeDefined();
    expect(time).toBeDefined();
    expect(set).toBeDefined();
    expect(refund).toBeDefined();
    expect(purchase).toBeDefined();
    expect(customMap).toBeDefined();
  });

  test("routes tracker", () => {
    expect(addRoutesTracker).toBeDefined();
  });
});
