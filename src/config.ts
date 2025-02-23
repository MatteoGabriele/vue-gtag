import type { Router } from "vue-router";

export type Config = {
  tagId?: string;
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

const defaultConfig: Readonly<Config> = {
  enabled: false,
  resourceUrl: "https://www.googletagmanager.com/gtag/js",
  resourceUrlPreconnect: "https://www.googletagmanager.com",
  resourceDeferred: false,
  dataLayerName: "dataLayer",
  gtagName: "gtag",
};

let config: Config = { ...defaultConfig };

export const getConfig = (): Config => config;

export const resetConfig = (): void => {
  config = { ...defaultConfig };
};

export const updateConfig = (configParams: Partial<Config>): void => {
  config = { ...config, ...configParams };
};
