import attachApi from "@/attach-api";
import { setOptions, getOptions } from "@/options";
import bootstrap from "@/bootstrap";
import { setRouter } from "@/router";

export default {
  install(Vue, options = {}, router) {
    attachApi(Vue);
    setOptions(options);
    setRouter(router);

    if (getOptions().bootstrap) {
      bootstrap();
    }
  },
};
