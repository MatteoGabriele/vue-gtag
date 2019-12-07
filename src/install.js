import { mergeDeep } from "./util";
import extend from "./extend";
import bootstrap from "./bootstrap";

let Vue;
let Router;
let options = {
  enabled: true,
  disableScriptLoad: false,
  bootstrap: true,
  globalObjectName: "gtag",
  pageTrackerTemplate: null,
  onReady: null,
  pageTrackerEnabled: true,
  pageTrackerScreenviewEnabled: false,
  defaultGroupName: "default",
  sendTo: null,
  includes: null,
  config: null
};

export const getOptions = () => options;
export const setOptions = _options => mergeDeep(options, _options);
export const getVue = () => Vue;
export const getRouter = () => Router;

export function install(_Vue, _options = {}, _Router) {
  Vue = _Vue;
  Router = _Router;

  setOptions(_options);

  extend();

  if (options.bootstrap) {
    bootstrap();
  }
}
