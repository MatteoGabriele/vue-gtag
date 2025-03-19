import type { Settings } from "./types/settings";
import { deepMerge } from "./utils";

const defaultSettings: Readonly<Settings> = {
  resource: { url: "https://www.googletagmanager.com/gtag/js" },
  dataLayerName: "dataLayer",
  gtagName: "gtag",
  groupName: "default",
};

let settings: Settings = { ...defaultSettings };

export function getSettings(): Settings {
  return settings;
}

export function resetSettings(): void {
  settings = { ...defaultSettings };
}

export function updateSettings(configParams: Partial<Settings>): void {
  settings = deepMerge(settings, configParams);
}
