import type { App } from "vue";
import addGtag from "./add-gtag";
import * as api from "./api";
import { type Settings, updateSettings } from "./settings";

declare global {
  interface Window {
    // biome-ignore lint/suspicious/noExplicitAny:
    [gtag: Settings["gtagName"]]: any | any[];
    // biome-ignore lint/suspicious/noExplicitAny:
    [dataLayer: Settings["dataLayerName"]]: any | any[];
  }
}

type CreateGtagSettings = Partial<Settings> & Required<Pick<Settings, "tagId">>;
type CreateGtagReturn = (app: App) => void;

export const createGtag = (settings: CreateGtagSettings): CreateGtagReturn => {
  updateSettings(settings);
  addGtag();

  return (app) => {
    app.config.globalProperties.$gtag = api;
  };
};

export * from "./api";
