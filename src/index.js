import attachApi from "@/attach-api";
import { setUserOptions } from "@/options";
import bootstrap from "@/bootstrap";
import { setRouter } from "@/router";

export default {
  install(Vue, options = {}, router) {
    attachApi(Vue);
    setUserOptions(options);

    if (router) {
      setRouter(router);
    }

    bootstrap();
  },
};
