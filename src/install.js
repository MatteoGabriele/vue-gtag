import extend from "./extend";
import bootstrap from "./bootstrap";
import { mergeDeep } from "./util";

export let Vue;
export let Router;
export let options = {};

export function install(_Vue, _options = {}, _Router) {
  Vue = _Vue;
  Router = _Router;

  options = mergeDeep(
    {
      globalObjectName: "gtag",
      pageTrackerTemplate: () => null,
      pageTrackerShouldUpdate: () => true,
      pageTrackerEnabled: Router != null,
      pageTrackerScreenviewEnabled: false,
      config: {
        id: null,
        params: {
          send_page_view: true
        }
      }
    },
    _options
  );

  extend();
  bootstrap();
}
