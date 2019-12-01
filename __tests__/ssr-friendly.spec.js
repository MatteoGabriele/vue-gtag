/**
 * @jest-environment node
 */
import bootstrap from "@/bootstrap";
import * as util from "@/util";

describe("SSR friendly", () => {
  it("should be SSR friendly", () => {
    util.loadScript = jest.fn();

    bootstrap();

    expect(util.loadScript).not.toHaveBeenCalled();
  });
});
