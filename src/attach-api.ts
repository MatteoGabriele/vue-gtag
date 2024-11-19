import * as api from "src/api";

const attachApi = (app) => {
  app.config.globalProperties.$gtag = api;
};

export default attachApi;
