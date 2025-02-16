import { mergeDeep } from "@/utils";
import type { GtagOptions } from "./types";

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
