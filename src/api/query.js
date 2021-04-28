import { getOptions } from "@/options";
import { isBrowser } from "@/utils";

export default (...args) => {
  if (!isBrowser()) {
    return;
  }

  const { globalObjectName } = getOptions();

  window[globalObjectName](...args);
};
