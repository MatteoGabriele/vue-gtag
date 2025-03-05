import type { Route } from "@/types";
import type { Router } from "vue-router";

type ConfigParams =
  | Gtag.ControlParams
  | Gtag.EventParams
  | Gtag.ConfigParams
  | Gtag.CustomParams;

type PageTrackerTemplate = Partial<Route> | ((route: Route) => Partial<Route>);

type PageTracker = {
  router: Router;
  template?: PageTrackerTemplate;
  useScreenview?: boolean;
  exclude?: Array<{ path?: string; name?: string }>;
  appName?: string;
  onBeforeTrack?: () => void;
  onAfterTrack?: () => void;
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
