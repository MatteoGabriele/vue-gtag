import { deepMerge } from "@/utils";
import type { Settings } from "./types";

const defaultSettings: Readonly<Settings> = {
  resource: {
    url: "https://www.googletagmanager.com/gtag/js",
    inject: true,
  },
  dataLayerName: "dataLayer",
  gtagName: "gtag",
  groupName: "default",
  initMode: "auto",
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
