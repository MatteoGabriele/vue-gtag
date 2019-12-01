import { getVue } from "../src/install";
import extend from "../src/extend";
import { createLocalVue } from "@vue/test-utils";

const localVue = createLocalVue();

jest.mock("../src/install");

describe("extend", () => {
  it("should attach api to Vue and Vue prototype object", () => {
    getVue.mockReturnValueOnce(localVue);

    extend();

    expect(localVue.$gtag).toBeDefined();
    expect(localVue.prototype.$gtag).toBeDefined();
  });
});
