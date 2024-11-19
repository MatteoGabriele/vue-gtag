import { getOptions } from "src/options";
import { isBrowser } from "src/utils";

export default (...args) => {
  const { globalObjectName } = getOptions();

  if (!isBrowser() || typeof window[globalObjectName] === "undefined") {
    return;
  }

  window[globalObjectName](...args);
};
