import { getOptions } from "@/options";
import { isBrowser } from "@/utils";

export default (...args) => {
  const { globalObjectName } = getOptions();

  if (!isBrowser() || typeof window[globalObjectName] === "undefined") {
    return;
  }

  window[globalObjectName](...args);
};
