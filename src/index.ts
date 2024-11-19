import attachApi from "src/attach-api";
import { setOptions, getOptions } from "src/options";
import bootstrap from "src/bootstrap";
import { setRouter } from "src/router";

const install = (app, options = {}, router) => {
  attachApi(app);
  setOptions(options);
  setRouter(router);

  if (getOptions().bootstrap) {
    bootstrap();
  }
};

export { default as query } from "src/api/query";
export { default as config } from "src/api/config";
export { default as optOut } from "src/api/opt-out";
export { default as optIn } from "src/api/opt-in";
export { default as pageview } from "src/api/pageview";
export { default as screenview } from "src/api/screenview";
export { default as exception } from "src/api/exception";
export { default as linker } from "src/api/linker";
export { default as time } from "src/api/time";
export { default as set } from "src/api/set";
export { default as refund } from "src/api/refund";
export { default as purchase } from "src/api/purchase";
export { default as customMap } from "src/api/custom-map";
export { default as event } from "src/api/event";

export { default as bootstrap } from "src/bootstrap";
export { default as addRoutesTracker } from "src/add-routes-tracker";

export { setOptions } from "src/options";
export { setRouter } from "src/router";

export { install };

export default install;
