export const noop = function() {};

export function loadScript(url) {
  return new Promise((resolve, reject) => {
    var head = document.head;
    const script = document.createElement("script");
    script.src = url;
    script.setAttribute("rel", "preconnect");
    script.setAttribute("async", true);
    script.charset = "utf-8";

    head.appendChild(script);

    script.onload = resolve;
    script.onerror = reject;
  });
}

export function warn(msg, err) {
  console.warn("[vue-gtag] " + msg);

  if (err && err.stack) {
    console.warn(err.stack);
  }
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
