import { mergeDeep } from "@/utils";
import type { RouteLocationNormalized } from "vue-router";

export type RoutePath = RouteLocationNormalized;
export type PageTrackerTemplate = (
  to: RoutePath,
  from: RoutePath,
) => Gtag.ConfigParams;

export type Config = {
  id: string;
  params?: Gtag.ConfigParams;
};

export type GtagOptions = {
  bootstrap?: boolean;
  onReady?: (gtag: Gtag.Gtag) => void;
  onError?: (error: Error) => void;
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
  globalDataLayerName: string;
  globalObjectName: string;
  defaultGroupName: string;
  includes?: Config[];
  config?: Config;
};

export type InstallOptions = Partial<Omit<GtagOptions, "config">> & {
  config: Config;
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

let params: GtagOptions = getDefaultParams();

export const setOptions = (options: Partial<GtagOptions>): void => {
  const defaultParams = getDefaultParams();
  params = mergeDeep(defaultParams, options);
};

export const getOptions = (): GtagOptions => params;
