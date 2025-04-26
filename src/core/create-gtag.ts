import { config } from "@/api/config";
import { consent, consentDeniedAll, consentGrantedAll } from "@/api/consent";
import { customMap } from "@/api/custom-map";
import { ecommerce } from "@/api/ecommerce";
import { event } from "@/api/event";
import { exception } from "@/api/exception";
import { linker } from "@/api/linker";
import { optIn, optOut } from "@/api/opt";
import { pageview } from "@/api/pageview";
import { query } from "@/api/query";
import { screenview } from "@/api/screenview";
import { set } from "@/api/set";
import { time } from "@/api/time";
import { addGtag } from "@/core/add-gtag";
import { getSettings, updateSettings } from "@/core/settings";
import type { PluginSettings } from "@/types/settings";
import type { App } from "vue";

function initGtag() {
  const { initMode } = getSettings();

  if (initMode === "manual") {
    return;
  }

  addGtag();
}

/**
 * Configures Google Analytics gtag instance
 * @param settings - Configuration settings for the gtag plugin
 */
export function configure(settings: PluginSettings): void {
  updateSettings(settings);
  initGtag();
}

const api = {
  config,
  consent,
  consentDeniedAll,
  consentGrantedAll,
  customMap,
  ecommerce,
  event,
  exception,
  linker,
  optIn,
  optOut,
  pageview,
  screenview,
  set,
  time,
  query,
};

type GtagAPI = typeof api;

declare module "vue" {
  interface ComponentCustomProperties {
    $gtag: GtagAPI;
  }
}

type CreateGtagReturn = (app: App) => void;

/**
 * Creates and configures Google Analytics gtag instance for Vue application
 * @param settings - Configuration settings for the gtag plugin
 */
export function createGtag(settings: PluginSettings): CreateGtagReturn {
  configure(settings);

  return (app: App) => {
    app.config.globalProperties.$gtag = api;
  };
}
