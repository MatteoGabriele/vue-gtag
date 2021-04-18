import { getOptions } from "@/options";

const query = (...args) => {
  if (typeof window === "undefined") {
    return;
  }

  const { globalObjectName } = getOptions();

  window[globalObjectName](...args);
};

export default query;
