import * as api from "@/api/index";
import { addGtag } from "@/core/add-gtag";
import {
  type PluginSettings,
  getSettings,
  updateSettings,
} from "@/core/settings";
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
