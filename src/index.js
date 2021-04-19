import attachApi from "@/attach-api";
import { setOptions } from "@/options";
import bootstrap from "@/bootstrap";
import { setRouter } from "@/router";

export default {
  install(Vue, options = {}, router) {
    attachApi(Vue);
    setOptions(options);
    setRouter(router);
    bootstrap();
  },
};
