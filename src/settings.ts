import type { PageTrackerParams, Route, Router } from "@/types";
import type { LinkerParams } from "./gtag/linker";

export type ConfigParams =
  | Gtag.ControlParams
  | Gtag.EventParams
  | Gtag.ConfigParams
  | Gtag.CustomParams;

export type PageTrackerTemplate =
  | PageTrackerParams
  | ((route: Route) => PageTrackerParams);

export type PageTracker = {
  router: Router;
  template?: PageTrackerTemplate;
  useScreenview?: boolean;
  exclude?: Array<{ path?: string; name?: string }>;
  appName?: string;
  onBeforeTrack?: (route: Route) => void;
  onAfterTrack?: (route: Route) => void;
};

export type Settings = {
  tagId?: string;
  config?: ConfigParams;
  additionalAccounts?: Array<{ tagId: string; config?: ConfigParams }>;
  enabled: boolean | (() => Promise<boolean>);
  resourceUrl: string;
  resourceUrlPreconnect: string;
  resourceDeferred: boolean;
  dataLayerName: string;
  gtagName: string;
  pageTracker?: PageTracker;
  onReady?: () => void;
  onError?: (error: unknown) => void;
  linker?: LinkerParams;
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
