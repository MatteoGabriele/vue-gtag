export const noop = function () {};

export function loadScript(url, preconnectOrigin) {
  return new Promise((resolve, reject) => {
    const head = document.head || document.getElementsByTagName("head")[0];
    const script = document.createElement("script");

    script.async = true;
    script.src = url;
    script.charset = "utf-8";

    if (preconnectOrigin) {
      const link = document.createElement("link");

      link.href = preconnectOrigin;
      link.rel = "preconnect";

      head.appendChild(link);
    }

    head.appendChild(script);

    script.onload = resolve;
    script.onerror = reject;
  });
}

export function warn(msg) {
  console.warn("[vue-gtag] " + msg);
}

export function isFn(item) {
  return typeof item === "function";
}

export function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}

export function mergeDeep(target, ...sources) {
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
}
