import { mergeDeep } from "@/utils";

let params = {
  customResourceURL: "https://www.googletagmanager.com/gtag/js",
  globalDataLayerName: "dataLayer",
  globalObjectName: "gtag",
  config: {
    params: {
      send_page_view: false,
    },
  },
};

export const merge = (source = {}) => {
  params = mergeDeep(params, source);
  return params;
};

export default params;
