import { getVue } from "./install";
import api from "./api";

export default () => {
  const Vue = getVue();

  Vue.$gtag = Vue.prototype.$gtag = api;
};
