import { mergeDeep } from "@/utils";

export const getDefaultParams = () => ({
  onReady: null,
  onError: null,
  customResourceURL: "https://www.googletagmanager.com/gtag/js",
  customPreconnectOrigin: "https://www.googletagmanager.com",
  deferScriptLoad: false,
  pageTrackerEnabled: true,
  enabled: true,
  disableScriptLoad: false,
  globalDataLayerName: "dataLayer",
  globalObjectName: "gtag",
  config: {
    params: {
      send_page_view: false,
    },
  },
});

let params = {};

export const setUserOptions = (options = {}) => {
  const defaultParams = getDefaultParams();
  params = mergeDeep(defaultParams, options);
};

export const getOptions = () => {
  return params;
};
