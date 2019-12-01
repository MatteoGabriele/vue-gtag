import { getOptions } from "../install";

export default function(method, ...args) {
  const { globalObjectName } = getOptions();

  if (typeof window === "undefined") {
    return;
  }

  window[globalObjectName](method, ...args);
}
