import { Vue, options } from "./install";
import query from "./lib/query";
import config from "./lib/config";
import event from "./lib/event";
import pageview from "./lib/pageview";
import screenview from "./lib/screenview";
import customMap from "./lib/custom-map";
import time from "./lib/time";
import exception from "./lib/exception";
import linker from "./lib/linker";
import purchase from "./lib/purchase";
import set from "./lib/set";
import optIn from "./lib/opt-in";
import optOut from "./lib/opt-out";

export default function() {
  Vue.prototype.$gtag = {
    query,
    config,
    event,
    pageview,
    screenview,
    customMap,
    time,
    exception,
    linker,
    purchase,
    set,
    optIn,
    optOut,
    $getOptions: () => {
      return JSON.parse(JSON.stringify(options));
    }
  };
}
