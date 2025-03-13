import type { LinkerParams } from "./api/linker";
import type { PageTrackerParams, Route, Router } from "./types";

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
  resourceUrl: string;
  resourceUrlPreconnect: string;
  resourceDeferred: boolean;
  dataLayerName: string;
  gtagName: string;
  pageTracker?: PageTracker;
  onReady?: () => void;
  onError?: (error: unknown) => void;
  linker?: LinkerParams;
  groupName: string;
};

const defaultSettings: Readonly<Settings> = {
  resourceUrl: "https://www.googletagmanager.com/gtag/js",
  resourceUrlPreconnect: "https://www.googletagmanager.com",
  resourceDeferred: false,
  dataLayerName: "dataLayer",
  gtagName: "gtag",
  groupName: "default",
};

let settings: Settings = { ...defaultSettings };

export const getSettings = (): Settings => settings;

export const resetSettings = (): void => {
  settings = { ...defaultSettings };
};

export const updateSettings = (configParams: Partial<Settings>): void => {
  settings = { ...settings, ...configParams };
};
