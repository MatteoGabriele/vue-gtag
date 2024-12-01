import { beforeEach, vi, describe, expect, test } from "vitest";
import * as helper from "src/helper.ts";
import { setOptions } from "src/options.ts";
import bootstrap from "src/bootstrap.ts";
import flushPromises from "flush-promises";

vi.mock("src/helper.ts");

describe("bootstrap", () => {
  beforeEach(() => {
    vi.spyOn(helper, "loadScript").mockResolvedValue();
  });

  test("load gtag.js", async () => {
    const onReadySpy = vi.fn();

    setOptions({
      configs: [{ targetId: "UA-12345678" }],
      onReady: onReadySpy,
    });

    await bootstrap();
    await flushPromises();

    expect(helper.loadScript).toHaveBeenCalledWith(
      "https://www.googletagmanager.com/gtag/js?id=UA-12345678&l=gtag",
      {
        defer: true,
        preconnectOrigin: "https://www.googletagmanager.com",
      },
    );

    expect(onReadySpy).toHaveBeenCalled();
  });

  test("loading gtag.js throws an error", async () => {
    vi.spyOn(helper, "loadScript").mockRejectedValue(new Error("oopsy"));

    const onErrorSpy = vi.fn();

    setOptions({
      configs: [{ targetId: "UA-12345678" }],
      onError: onErrorSpy,
    });

    await bootstrap();
    await flushPromises();

    expect(helper.loadScript).toHaveBeenCalledWith(
      "https://www.googletagmanager.com/gtag/js?id=UA-12345678&l=gtag",
      {
        defer: true,
        preconnectOrigin: "https://www.googletagmanager.com",
      },
    );

    expect(onErrorSpy).toHaveBeenCalled();
  });
});
