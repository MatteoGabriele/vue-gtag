import { Vue } from "./install";
import query from "./lib/query";
import page from "./lib/page";

export default function() {
  Vue.prototype.$gtag = {
    query,
    page
  };
}
