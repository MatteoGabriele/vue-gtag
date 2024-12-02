import { options } from "src/options";

const query = (...args: Parameters<Gtag.Gtag>) => {
  const { debug, globalObjectName, dataLayerName } = options;

  let Window = window as any;

  if (Window[globalObjectName] == null) {
    Window[dataLayerName] = Window[dataLayerName] || [];
    Window[globalObjectName] = function () {
      Window[dataLayerName].push(arguments);

      if (debug) {
        console.log([...arguments]);
      }
    };
  }

  Window[globalObjectName](...args);
};

export default query;
