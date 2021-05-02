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

export const isFn = (fn) => typeof fn === "function";

export const isObject = (item) => {
  return item && typeof item === "object" && !Array.isArray(item);
};

export const mergeDeep = (target, ...sources) => {
  if (!sources.length) {
    return target;
  }

  const source = sources.shift();

  if (!isObject(target) || !isObject(source)) {
    return;
  }

  for (const key in source) {
    if (isObject(source[key])) {
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
