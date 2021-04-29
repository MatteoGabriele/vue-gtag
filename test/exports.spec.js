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

  test("event", () => {
    expect(event).toBeDefined();
  });

  test("query", () => {
    expect(query).toBeDefined();
  });

  test("config", () => {
    expect(config).toBeDefined();
  });

  test("optOut", () => {
    expect(optOut).toBeDefined();
  });

  test("pageview", () => {
    expect(pageview).toBeDefined();
  });

  test("screenview", () => {
    expect(screenview).toBeDefined();
  });

  test("exception", () => {
    expect(exception).toBeDefined();
  });

  test("linker", () => {
    expect(linker).toBeDefined();
  });

  test("time", () => {
    expect(time).toBeDefined();
  });

  test("set", () => {
    expect(set).toBeDefined();
  });

  test("refund", () => {
    expect(refund).toBeDefined();
  });

  test("purchase", () => {
    expect(purchase).toBeDefined();
  });

  test("customMap", () => {
    expect(customMap).toBeDefined();
  });
});
