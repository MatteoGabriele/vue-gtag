import * as api from "@/api";
import type { App } from "vue";

const attachApi = (app: App) => {
  app.config.globalProperties.$gtag = api;
};

export default attachApi;
