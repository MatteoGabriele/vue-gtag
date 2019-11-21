import { Vue, Router, install, options } from "../src/install";
import bootstrap from "../src/bootstrap";
import extend from "../src/extend";

jest.mock("../src/extend");
jest.mock("../src/bootstrap");

describe("install", () => {
  it("should have default options", () => {
    expect(options).toMatchSnapshot();
  });

  it("should merge options on install", () => {
    install(null, {
      enabled: false,
      config: { id: 1 }
    });

    expect(options).toMatchSnapshot();
  });

  it("should make a copy of the Vue instance", () => {
    install("foo");
    expect(Vue).toEqual("foo");
  });

  it("should make a copy of the VueRouter instance", () => {
    install(null, null, "foo");
    expect(Router).toEqual("foo");
  });

  it("should trigger bootstrap", () => {
    install();
    expect(bootstrap).toHaveBeenCalled();
  });

  it("should trigger extend", () => {
    install();
    expect(extend).toHaveBeenCalled();
  });
});
