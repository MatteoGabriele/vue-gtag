import { install, getOptions } from "../src/install";
import bootstrap from "../src/bootstrap";
import extend from "../src/extend";

jest.mock("../src/extend");
jest.mock("../src/bootstrap");

describe("install", () => {
  it("should have default options", () => {
    expect(getOptions()).toMatchSnapshot();
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
