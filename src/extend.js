import { Vue } from "./install";
import query from "./lib/query";
import config from "./lib/config";

export default function() {
  Vue.prototype.$gtag = {
    query,
    config
  };
}
