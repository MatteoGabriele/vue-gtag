import addGtag from "./add-gtag";
import { type Settings, updateSettings } from "./settings";

declare global {
  interface Window {
    // biome-ignore lint/suspicious/noExplicitAny:
    [gtag: Settings["gtagName"]]: any | any[];
    // biome-ignore lint/suspicious/noExplicitAny:
    [dataLayer: Settings["dataLayerName"]]: any | any[];
  }
}

type AppSettings = Partial<Settings> & Required<Pick<Settings, "tagId">>;

export const createGtag = async (settings: AppSettings): Promise<void> => {
  updateSettings(settings);

  const enabled =
    typeof settings.enabled === "function"
      ? await settings.enabled()
      : settings.enabled;

  if (!enabled) {
    return;
  }

  await addGtag();
};

export { default as useGtag } from "./composable/use-gtag";

export * from "./api";
