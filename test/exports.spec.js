import {
  screenview,
  pageview,
  optOut,
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
});
