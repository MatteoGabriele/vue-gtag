import { noop, mergeDeep } from "./util";
import extend from "./extend";
import bootstrap from "./bootstrap";

let Vue;
let Router;

export let options = {
  customResourceURL: "https://www.googletagmanager.com/gtag/js",
  customPreconnectOrigin: "https://www.googletagmanager.com",
  pageTrackerTemplate: noop,
  onBeforeTrack: noop,
  onAfterTrack: noop,
  onReady: noop,
  enabled: true,
  disableScriptLoad: false,
  bootstrap: true,
  globalObjectName: "gtag",
  globalDataLayerName: "dataLayer",
  pageTrackerEnabled: true,
  pageTrackerScreenviewEnabled: false,
  pageTrackerSkipSamePath: true,
  defaultGroupName: "default",
  includes: null,
  config: null,
};

export const getOptions = () => options;
export const setOptions = (_options) => mergeDeep(options, _options);
export const getVue = () => Vue;
export const getRouter = () => Router;

export function install(_Vue, _options = {}, _Router) {
  Vue = _Vue;
  Router = _Router;

  setOptions(_options);

  extend();

  if (!options.bootstrap) {
    return;
  }

  bootstrap();
}
