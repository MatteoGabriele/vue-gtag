import { isBrowser } from "@/utils";
import { getOptions } from "@/options";

const attachToScope = () => {
  if (!isBrowser()) {
    return;
  }

  const { globalObjectName, globalDataLayerName } = getOptions();

  if (window[globalObjectName] == null) {
    window[globalDataLayerName] = window[globalDataLayerName] || [];
    window[globalObjectName] = function () {
      window[globalDataLayerName].push(arguments);
    };
  }

  window[globalObjectName]("js", new Date());

  return window[globalObjectName];
};

export default attachToScope;
