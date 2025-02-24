import type { Router } from "vue-router";

export type ConfigParams =
  | Gtag.ControlParams
  | Gtag.EventParams
  | Gtag.ConfigParams
  | Gtag.CustomParams;

export type Settings = {
  tagId?: string;
  config?: ConfigParams;
  domains?: Array<{ tagId: string; config?: ConfigParams }>;
  enabled: boolean | (() => Promise<boolean>);
  resourceUrl: string;
  resourceUrlPreconnect: string;
  resourceDeferred: boolean;
  dataLayerName: string;
  gtagName: string;
  router?: Router;
  onReady?: () => void;
  onError?: (error: unknown) => void;
};

const defaultSettings: Readonly<Settings> = {
  enabled: false,
  resourceUrl: "https://www.googletagmanager.com/gtag/js",
  resourceUrlPreconnect: "https://www.googletagmanager.com",
  resourceDeferred: false,
  dataLayerName: "dataLayer",
  gtagName: "gtag",
};

let settings: Settings = { ...defaultSettings };

export const getSettings = (): Settings => settings;

export const resetSettings = (): void => {
  settings = { ...defaultSettings };
};

export const updateSettings = (configParams: Partial<Settings>): void => {
  settings = { ...settings, ...configParams };
};
