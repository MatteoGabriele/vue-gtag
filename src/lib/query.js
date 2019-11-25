import { options } from "../install";

export default function(method, ...args) {
  if (typeof window === "undefined") {
    return;
  }

  if (window[options.globalObjectName]) {
    window[options.globalObjectName](method, ...args);
  } else {
    console.warn("gtag is not loaded yet")
  }

}