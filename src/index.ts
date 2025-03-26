import type { App } from "vue";
import * as api from "./api/index";
import { useConsent } from "./composables/use-consent";
import addGtag from "./core/add-gtag";
import { type PluginSettings, updateSettings } from "./core/settings";

type GtagAPI = typeof api;

declare module "vue" {
  interface ComponentCustomProperties {
    $gtag: GtagAPI;
  }
}

type CreateGtagReturn = (app: App) => void;

export function createGtag(settings: PluginSettings): CreateGtagReturn {
  updateSettings(settings);
  addGtag();

  return (app: App) => {
    app.config.globalProperties.$gtag = api;
  };
}

export * from "./api/index";

export { useConsent };
