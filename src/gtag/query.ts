import { getSettings } from "@/settings";

type QueryParams = Parameters<Gtag.Gtag>;

export default function query(...args: QueryParams): void {
  const { dataLayerName, gtagName } = getSettings();

  window[dataLayerName] = window[dataLayerName] || [];

  // biome-ignore lint/suspicious/noExplicitAny:
  const gtag = (...args: any[]) => window[dataLayerName].push(args);

  window[gtagName] = window[gtagName] || gtag;

  window[gtagName](...args);
}
