import type { App } from "vue";
import addGtag from "./add-gtag";
import * as api from "./api";
import { type Settings, updateSettings } from "./settings";

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
