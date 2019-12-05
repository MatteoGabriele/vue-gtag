import { getVue, getRouter, install, getOptions } from "@/install";
import bootstrap from "@/bootstrap";
import extend from "@/extend";

jest.mock("@/extend");
jest.mock("@/bootstrap");

describe("install", () => {
  it("should have default options", () => {
    expect(getOptions()).toMatchSnapshot();
  });

  it("should return VueRouter", () => {
    install(null, null, { foo: "bar" });
    expect(getRouter()).toEqual({ foo: "bar" });
  });

  it("should return Vue", () => {
    install({ foo: "bar" });
    expect(getVue()).toEqual({ foo: "bar" });
  });

  it("should call extend", () => {
    install();
    expect(extend).toHaveBeenCalled();
  });

  it("should call bootstrap", () => {
    install();
    expect(bootstrap).toHaveBeenCalled();
  });
});
