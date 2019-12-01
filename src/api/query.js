import { options } from "../install";

export default function(method, ...args) {
  if (typeof window === "undefined") {
    return;
  }

  window[options.globalObjectName](method, ...args);
}
