import { getOptions } from "../install";

export default function(...args) {
  const { globalObjectName } = getOptions();

  if (typeof window === "undefined") {
    return;
  }

  window[globalObjectName](...args);
}
