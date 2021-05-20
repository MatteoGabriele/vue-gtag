import * as util from "@/utils";
import flushPromises from "flush-promises";

describe("load", () => {
  afterEach(() => {
    document.getElementsByTagName("html")[0].innerHTML = "";
  });

  it("should return a promise", () => {
    expect(util.load("a")).toBeInstanceOf(Promise);
  });

  it("should create a script tag", async () => {
    util.load("foo");

    await flushPromises();

    expect(document.head).toMatchSnapshot();
  });

  it("should create a link for domain preconnect", async () => {
    util.load("foo", {
      preconnectOrigin: "bar",
    });

    await flushPromises();

    expect(document.head).toMatchSnapshot();
  });

  it("should create a script tag with the defer attribute", async () => {
    util.load("foo", {
      defer: true,
    });

    await flushPromises();

    expect(document.head).toMatchSnapshot();
  });
});

describe("mergeDeep", () => {
  it("should merge two objects", () => {
    const a = { a: 1, c: { a: 1 } };
    const b = { b: 1, c: { b: 1 } };
    const c = util.mergeDeep(a, b);

    expect(c).toMatchObject({
      a: 1,
      b: 1,
      c: {
        b: 1,
        a: 1,
      },
    });
  });

  it("should merge objects containing arrays", () => {
    const a = { c: [1, 2, 3] };
    const b = { c: [4, 5], d: { b: 1 } };
    const c = util.mergeDeep(a, b);

    expect(c).toEqual({
      c: [4, 5],
      d: { b: 1 },
    });
  });
});

describe("warn", () => {
  it("should warn with a customized message prefix", () => {
    console.warn = jest.fn();
    util.warn("foo");
    expect(console.warn).toHaveBeenCalledWith("[vue-gtag] foo");
  });
});
