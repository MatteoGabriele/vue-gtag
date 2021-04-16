import * as api from "@/api";
import { merge } from "@/options";
import bootstrap from "@/bootstrap";

export default {
  install(Vue, options = {}) {
    Vue.$gtag = Vue.prototype.$gtag = api;

    merge(options);
    bootstrap();
  },
};
