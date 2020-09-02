import * as util from "@/util";
import flushPromises from "flush-promises";

describe("loadScript", () => {
  afterEach(() => {
    document.getElementsByTagName("html")[0].innerHTML = "";
  });

  it("should return a promise", () => {
    expect(util.loadScript("a")).toBeInstanceOf(Promise);
  });

  it("should create a script tag", (done) => {
    util.loadScript("foo");

    flushPromises().then(() => {
      expect(document.head).toMatchSnapshot();
      done();
    });
  });

  it("should create a link for domain preconnect", (done) => {
    util.loadScript("foo", "bar");

    flushPromises().then(() => {
      expect(document.head).toMatchSnapshot();
      done();
    });
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

  it("should console the error", () => {
    console.warn = jest.fn();
    util.warn("foo", new Error());
    expect(console.warn).toHaveBeenCalledTimes(2);
  });
});

describe("isFn", () => {
  it("should return true", () => {
    expect(util.isFn(() => {})).toBe(true);
  });

  it("should return false", () => {
    expect(util.isFn("hello")).toBe(false);
  });
});

describe("isObject", () => {
  it("should return true", () => {
    expect(util.isObject({})).toBe(true);
  });
  it("should return false", () => {
    expect(util.isObject([])).toBe(false);
    expect(util.isObject("aa")).toBe(false);
  });
});

describe("getUrlOrigin", () => {
  it("should return the correct origin string", () => {
    expect(util.getUrlOrigin("https://vuejs.org/v2/guide/")).toBe("https://vuejs.org");
    expect(util.getUrlOrigin("https://vuejs.org/v2/guide/#Getting-Started")).toBe("https://vuejs.org");
    expect(util.getUrlOrigin("https://mozilla.org:443/")).toBe("https://mozilla.org");
    expect(util.getUrlOrigin("blob:https://mozilla.org:443/")).toBe("https://mozilla.org");
    expect(util.getUrlOrigin("blob:http://mozilla.org:8080/")).toBe("http://mozilla.org:8080");
    expect(util.getUrlOrigin("https://github.com/MatteoGabriele/vue-gtag.git")).toBe("https://github.com");
    expect(util.getUrlOrigin("https://github.com/MatteoGabriele/vue-gtag#install")).toBe("https://github.com");
    expect(util.getUrlOrigin("https://github.com/MatteoGabriele/vue-gtag?query-string=value")).toBe("https://github.com");
  });
  it("should throw error", () => {
    expect(() => util.getUrlOrigin("")).toThrow();
    expect(() => util.getUrlOrigin("abcdefghijklmn")).toThrow();
    expect(() => util.getUrlOrigin("google.com")).toThrow();
    expect(() => util.getUrlOrigin("https://google.com:65536/")).toThrow();
    expect(() => util.getUrlOrigin(undefined)).toThrow();
    expect(() => util.getUrlOrigin({})).toThrow();
  });
});
