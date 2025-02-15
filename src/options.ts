import { mergeDeep } from "@/utils";
import type { RouteLocationNormalized } from "vue-router";

export type TrackingTemplate = {
  app_name?: string;
  screen_name?: string;
};

export type RoutePath = RouteLocationNormalized;
export type PageTrackerTemplate = (
  to: RoutePath,
  from: RoutePath,
) => TrackingTemplate;

type Config = {
  id: string;
  params?: Record<string, unknown>;
};

type GtagOptions = {
  bootstrap?: boolean;
  onReady?: () => void;
  onError?: () => void;
  onBeforeTrack?: () => void;
  onAfterTrack?: () => void;
  pageTrackerTemplate?: PageTrackerTemplate;
  customResourceURL?: string;
  customPreconnectOrigin?: string;
  deferScriptLoad?: boolean;
  pageTrackerExcludedRoutes?: string[] | RoutePath[];
  pageTrackerEnabled?: boolean;
  enabled?: boolean;
  disableScriptLoad?: boolean;
  pageTrackerScreenviewEnabled?: boolean;
  appName?: string;
  pageTrackerUseFullPath?: boolean;
  pageTrackerPrependBase?: boolean;
  pageTrackerSkipSamePath?: boolean;
  globalDataLayerName?: string;
  globalObjectName?: string;
  defaultGroupName?: string;
  includes?: Config[];
  config?: Config;
};

export const getDefaultParams = (): GtagOptions => ({
  bootstrap: true,
  customResourceURL: "https://www.googletagmanager.com/gtag/js",
  customPreconnectOrigin: "https://www.googletagmanager.com",
  pageTrackerEnabled: true,
  enabled: true,
  pageTrackerPrependBase: true,
  pageTrackerSkipSamePath: true,
  globalDataLayerName: "dataLayer",
  globalObjectName: "gtag",
  defaultGroupName: "default",
});

let params: GtagOptions = {};

export const setOptions = (options: Partial<GtagOptions>): void => {
  const defaultParams = getDefaultParams();
  params = mergeDeep(defaultParams, options);
};

export const getOptions = (): GtagOptions => params;
