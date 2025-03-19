import type { App } from "vue";
import addGtag from "./add-gtag";
import * as api from "./api";
import { updateSettings } from "./settings";
import type { Settings } from "./types/settings";

type CreateGtagSettings = Partial<Settings> & Required<Pick<Settings, "tagId">>;
type CreateGtagReturn = (app: App) => void;

export function createGtag(settings: CreateGtagSettings): CreateGtagReturn {
  updateSettings(settings);
  addGtag();

  return (app) => {
    app.config.globalProperties.$gtag = api;
  };
}

export * from "./api";
