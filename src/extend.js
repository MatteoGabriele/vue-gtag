import { Vue } from "./install";
import query from "./lib/query";
import config from "./lib/config";
import event from "./lib/event";
import pageview from "./lib/pageview";
import screenview from "./lib/screenview";
import customMap from "./lib/custom-map";

export default function() {
  Vue.prototype.$gtag = {
    query,
    config,
    event,
    pageview,
    screenview,
    customMap
  };
}
