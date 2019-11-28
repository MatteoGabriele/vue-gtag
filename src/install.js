import { mergeDeep } from "./util";
import extend from "./extend";
import bootstrap from "./bootstrap";

export let Vue;
export let Router;
export let options = {
  enabled: true,
  globalObjectName: "gtag",
  pageTrackerTemplate: null,
  pageTrackerEnabled: true,
  pageTrackerScreenviewEnabled: false,
  config: {
    id: null,
    params: {
      send_page_view: true
    }
  }
};

export function install(_Vue, _options = {}, _Router) {
  Vue = _Vue;
  Router = _Router;

  options = mergeDeep(options, _options);

  extend(Vue);
  bootstrap(options);
}
