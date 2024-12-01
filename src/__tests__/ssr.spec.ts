// @vitest-environment node
import * as helper from "src/helper";
import { describe, expect, test } from "vitest";

describe("ssr", () => {
  test("loadScript does not thrown an error", async () => {
    expect(() => helper.loadScript("url_value_mock")).not.toThrow();
  });
});
