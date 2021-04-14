import { getOptions } from "../install";

export default function (...args) {
  const { globalObjectName } = getOptions();

  if (typeof document === "undefined" || typeof window === "undefined") {
    return;
  }

  window[globalObjectName](...args);
}
