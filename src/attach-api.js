import * as api from "@/api";

const attachApi = (Vue) => (Vue.$gtag = Vue.prototype.$gtag = api);

export default attachApi;
