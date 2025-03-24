import type { App } from "vue";
import addGtag from "./add-gtag";
import * as api from "./api";
import { type PluginSettings, updateSettings } from "./settings";

type CreateGtagReturn = (app: App) => void;

export type GtagAPI = {
  config: typeof api.config;
  consent: typeof api.consent;
  consentDeniedAll: typeof api.consentDeniedAll;
  consentGrantedAll: typeof api.consentGrantedAll;
  customMap: typeof api.customMap;
  ecommerce: typeof api.ecommerce;
  exception: typeof api.exception;
  linker: typeof api.linker;
  optIn: typeof api.optIn;
  optOut: typeof api.optOut;
  pageview: typeof api.pageview;
  query: typeof api.query;
  screenview: typeof api.screenview;
  set: typeof api.set;
  time: typeof api.time;
};

export default function createGtag(settings: PluginSettings): CreateGtagReturn {
  updateSettings(settings);
  addGtag();

  return (app: App) => {
    app.config.globalProperties.$gtag = api;
  };
}

declare module "vue" {
  interface ComponentCustomProperties {
    $gtag: GtagAPI;
  }
}
