import * as api from "@/api/index";
import { addGtag } from "@/core/add-gtag";
import {
  type PluginSettings,
  getSettings,
  updateSettings,
} from "@/core/settings";
import type { App } from "vue";

type GtagAPI = typeof api;

declare module "vue" {
  interface ComponentCustomProperties {
    $gtag: GtagAPI;
  }
}

type CreateGtagReturn = (app: App) => void;

function handleGtag() {
  const { initMode } = getSettings();

  if (initMode === "manual") {
    return;
  }

  addGtag();
}

/** Creates and initializes the `gtag` function for use within a Vue application. */
export function createGtag(settings: PluginSettings): CreateGtagReturn {
  updateSettings(settings);
  handleGtag();

  return (app: App) => {
    app.config.globalProperties.$gtag = api;
  };
}
