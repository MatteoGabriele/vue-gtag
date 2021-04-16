import { load } from "@/utils";
import * as api from "@/api";
import options from "@/options";

const bootstrap = () => {
  if (typeof window === "undefined") {
    return;
  }

  const {
    globalObjectName,
    globalDataLayerName,
    config,
    customResourceURL,
  } = options;

  if (window[globalObjectName] == null) {
    window[globalDataLayerName] = window[globalDataLayerName] || [];
    window[globalObjectName] = function () {
      window[globalDataLayerName].push(arguments);
    };
  }

  window[globalObjectName]("js", new Date());

  api.config(config.params);

  load(`${customResourceURL}?id=${config.id}&l=${globalDataLayerName}`);
};

export default bootstrap;
