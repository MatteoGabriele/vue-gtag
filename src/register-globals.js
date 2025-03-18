import * as api from "@/api";
import { getOptions } from "@/options";
import { isBrowser } from "@/utils";

export default () => {
  if (!isBrowser()) {
    return;
  }

  const { enabled, globalObjectName, globalDataLayerName } = getOptions();

  if (window[globalObjectName] == null) {
    window[globalDataLayerName] = window[globalDataLayerName] || [];
    window[globalObjectName] = function (){
      window[globalDataLayerName].push(arguments);
    };
  }

  window[globalObjectName]("js", new Date());

  if (!enabled) {
    api.optOut();
  }

  return window[globalObjectName];
};
