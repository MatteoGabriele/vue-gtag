import { createLocalVue } from "@vue/test-utils";
import VueGtag from "@/index";

export const install = (options) => {
  const localVue = createLocalVue();
  localVue.use(VueGtag, options);
  return localVue;
};
