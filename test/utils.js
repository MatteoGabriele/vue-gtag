import { createLocalVue } from "@vue/test-utils";
import * as router from "@/router";
import VueGtag from "@/index";

export const install = (params = {}, routerInstance = null) => {
  const localVue = createLocalVue();

  jest.spyOn(router, "getRouter").mockReturnValue(routerInstance);

  localVue.use(VueGtag, params, router);

  return localVue;
};
