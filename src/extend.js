import { Vue } from "./install";
import query from "./lib/query";
import config from "./lib/config";
import event from "./lib/event";
import screenview from "./lib/screenview";

export default function() {
  Vue.prototype.$gtag = {
    query,
    config,
    event,
    screenview
  };
}
