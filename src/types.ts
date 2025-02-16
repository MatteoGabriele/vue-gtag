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
  onError?: (error: unknown) => void;
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
