import attachApi from "@/attach-api";
import { setOptions, getOptions } from "@/options";
import bootstrap from "@/bootstrap";
import { setRouter } from "@/router";

const install = (app, options = {}, router) => {
  attachApi(app);
  setOptions(options);
  setRouter(router);

  if (getOptions().bootstrap) {
    bootstrap();
  }
};

export { default as query } from "@/api/query";
export { default as config } from "@/api/config";
export { default as optOut } from "@/api/opt-out";
export { default as optIn } from "@/api/opt-in";
export { default as pageview } from "@/api/pageview";
export { default as screenview } from "@/api/screenview";
export { default as exception } from "@/api/exception";
export { default as linker } from "@/api/linker";
export { default as time } from "@/api/time";
export { default as set } from "@/api/set";
export { default as refund } from "@/api/refund";
export { default as purchase } from "@/api/purchase";
export { default as customMap } from "@/api/custom-map";
export { default as event } from "@/api/event";

export { default as bootstrap } from "@/bootstrap";
export { default as addRoutesTracker } from "@/add-routes-tracker";

export { setOptions } from "@/options";
export { setRouter } from "@/router";

export { install };

export default install;
