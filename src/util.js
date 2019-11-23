export function loadScript(url) {
  return new Promise((resolve, reject) => {
    var head = document.head || document.getElementsByTagName("head")[0];
    const script = document.createElement("script");
    script.async = true;
    script.src = url;
    script.setAttribute("rel", "preconnect");
    script.charset = "utf-8";

    head.appendChild(script);

    script.onload = resolve;
    script.onerror = reject;
  });
}

export function warn(msg, err) {
  if (typeof console !== "undefined") {
    console.warn("[vue-gtag] " + msg);

    if (err) {
      console.warn(err.stack);
    }
  }
}

export function isFn(item) {
  return typeof item === "function";
}

export function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}

export function execFunc(func, ...args) {
  return isFn(func) && func(...args);
}

export function mergeDeep(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}
