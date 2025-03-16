import type { LinkerParams } from "./api/linker";
import type { PageTrackerParams } from "./types/page-tracker";
import type { Route, Router } from "./types/router";
import { deepMerge } from "./utils";

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

export type Resource = {
  url?: string;
  preconnect?: boolean;
  deferred?: boolean;
};

export type TagId = string;

export type Settings = {
  tagId?: TagId;
  config?: ConfigParams;
  additionalAccounts?: Array<{ tagId: TagId; config?: ConfigParams }>;
  resource: Resource;
  dataLayerName: string;
  gtagName: string;
  pageTracker?: PageTracker;
  onReady?: () => void;
  onError?: (error: unknown) => void;
  linker?: LinkerParams;
  groupName: string;
  /** In case you are already loading gtag.js yourself, you can pass true to avoid adding the script again */
  useCustomScript?: boolean;
};

const defaultSettings: Readonly<Settings> = {
  resource: {
    url: "https://www.googletagmanager.com/gtag/js",
    preconnect: false,
    deferred: false,
  },
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
  settings = deepMerge(settings, configParams);
};
