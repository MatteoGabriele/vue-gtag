/**
 * @jest-environment node
 */
import bootstrap from "../src/bootstrap";
import * as util from "../src/util";

describe("SSR friendly", () => {
  it("should be SSR friendly", () => {
    util.loadScript = jest.fn();

    bootstrap();

    expect(util.loadScript).not.toHaveBeenCalled();
  });
});
