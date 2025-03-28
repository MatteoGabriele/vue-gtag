import { getSettings } from "@/core/settings";
import type { Gtag } from "@/types/gtag";
import { isServer } from "@/utils";

export type QueryParams = Parameters<Gtag>;

declare global {
  interface Window {
    // biome-ignore lint/suspicious/noExplicitAny:
    [key: string]: any | any[];
  }
}

export function query(...args: QueryParams) {
  const { dataLayerName, gtagName } = getSettings();

  if (isServer()) {
    return;
  }

  window[dataLayerName] = window[dataLayerName] || [];

  // biome-ignore lint/complexity/useArrowFunction:
  window[gtagName] = function () {
    // biome-ignore lint/style/noArguments:
    window[dataLayerName].push(arguments);
  };

  window[gtagName](...args);
}
