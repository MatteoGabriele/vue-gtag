import { getSettings } from "../settings";
import isServer from "../utils";

export type QueryParams = Parameters<Gtag.Gtag>;

declare global {
  interface Window {
    // biome-ignore lint/suspicious/noExplicitAny:
    [key: string]: any | any[];
  }
}

export default function query(...args: QueryParams) {
  const { dataLayerName, gtagName } = getSettings();

  if (isServer()) {
    return;
  }

  window[dataLayerName] = window[dataLayerName] || [];

  // biome-ignore lint/suspicious/noExplicitAny:
  const gtag = (...args: any[]) => window[dataLayerName].push(args);

  window[gtagName] = window[gtagName] || gtag;

  window[gtagName](...args);
}
