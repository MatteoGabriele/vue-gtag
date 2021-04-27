import { getOptions } from "@/options";
import { isBrowser } from "@/utils";

const query = (...args) => {
  if (!isBrowser()) {
    return;
  }

  const { globalObjectName } = getOptions();

  window[globalObjectName](...args);
};

export default query;
