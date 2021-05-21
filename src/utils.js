import { isPlainObject } from "@vue/shared";

export const load = (url, options = {}) => {
  return new Promise((resolve, reject) => {
    if (typeof document === "undefined") {
      return;
    }

    const head = document.head || document.getElementsByTagName("head")[0];
    const script = document.createElement("script");

    script.async = true;
    script.src = url;
    script.defer = options.defer;

    if (options.preconnectOrigin) {
      const link = document.createElement("link");

      link.href = options.preconnectOrigin;
      link.rel = "preconnect";

      head.appendChild(link);
    }

    head.appendChild(script);

    script.onload = resolve;
    script.onerror = reject;
  });
};

export const mergeDeep = (target, ...sources) => {
  if (!sources.length) {
    return target;
  }

  const source = sources.shift();

  if (!isPlainObject(target) || !isPlainObject(source)) {
    return;
  }

  for (const key in source) {
    if (isPlainObject(source[key])) {
      if (!target[key]) {
        Object.assign(target, { [key]: {} });
      }

      mergeDeep(target[key], source[key]);
    } else {
      Object.assign(target, { [key]: source[key] });
    }
  }

  return mergeDeep(target, ...sources);
};

export const isBrowser = () => {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return false;
  }

  return true;
};

export const warn = (text, shouldLog = true) => {
  if (!isBrowser() || process.env.NODE_ENV === "production") {
    return;
  }

  if (!shouldLog) {
    return;
  }

  console.warn(`[vue-gtag] ${text}`);
};

export const validateScreenviewShape = (obj = {}) => {
  warn(
    `Missing "appName" property inside the plugin options.`,
    obj.app_name == null
  );

  warn(`Missing "name" property in the route.`, obj.screen_name == null);

  return obj;
};

export function getPathWithBase(path = "", base = "") {
  const pathAsArray = path.split("/");
  const baseAsArray = base.split("/");

  if (pathAsArray[0] === "" && base[base.length - 1] === "/") {
    pathAsArray.shift();
  }

  return baseAsArray.join("/") + pathAsArray.join("/");
}
