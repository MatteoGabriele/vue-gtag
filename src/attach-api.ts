import * as api from "@/api";

const attachApi = (app) => {
  app.config.globalProperties.$gtag = api;
};

export default attachApi;
