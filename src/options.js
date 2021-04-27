import { mergeDeep } from "@/utils";

export const getDefaultParams = () => ({
  onReady: null,
  onError: null,
  onBeforeTrack: null,
  onAfterTrack: null,
  customResourceURL: "https://www.googletagmanager.com/gtag/js",
  customPreconnectOrigin: "https://www.googletagmanager.com",
  deferScriptLoad: false,
  pageTrackerEnabled: true,
  enabled: true,
  disableScriptLoad: false,
  pageTrackerScreenviewEnabled: false,
  appName: "",
  globalDataLayerName: "dataLayer",
  pageTrackerSkipSamePath: true,
  globalObjectName: "gtag",
  config: {
    params: {
      send_page_view: false,
    },
  },
});

let params = {};

export const setOptions = (options = {}) => {
  const defaultParams = getDefaultParams();
  params = mergeDeep(defaultParams, options);
};

export const getOptions = () => {
  return params;
};
