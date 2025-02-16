export const load = (
  url: string,
  options?: {
    defer?: boolean;
    preconnectOrigin?: string;
  },
) => {
  return new Promise((resolve, reject) => {
    if (typeof document === "undefined") {
      return;
    }

    const head = document.head || document.getElementsByTagName("head")[0];
    const script = document.createElement("script");

    script.async = true;
    script.src = url;

    if (options?.defer) {
      script.defer = options.defer;
    }

    if (options?.preconnectOrigin) {
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

const isObject = (item: unknown): item is Record<string, unknown> => {
  return Boolean(item && typeof item === "object" && !Array.isArray(item));
};

export const mergeDeep = <T extends object>(
  target: T,
  source: Partial<T>,
): T => {
  for (const key in source) {
    const sourceValue = source[key];

    if (isObject(target[key]) && isObject(sourceValue)) {
      Object.assign(target, {
        [key]: mergeDeep(target[key], sourceValue as T),
      });
    } else if (sourceValue !== undefined) {
      Object.assign(target, { [key]: sourceValue });
    }
  }

  return target;
};

export const isBrowser = () => {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return false;
  }

  return true;
};

export const warn = (text: string, shouldLog = true) => {
  if (!isBrowser() || process.env.NODE_ENV === "production") {
    return;
  }

  if (!shouldLog) {
    return;
  }

  console.warn(`[vue-gtag] ${text}`);
};

export const validateScreenviewShape = (
  obj: Gtag.CustomParams,
): Gtag.ConfigParams => {
  warn(
    `Missing "appName" property inside the plugin options.`,
    obj.app_name == null,
  );

  warn(`Missing "name" property in the route.`, obj.screen_name == null);

  return obj;
};

export function getPathWithBase(path = "", base = ""): string {
  const pathAsArray = path.split("/");
  const baseAsArray = base.split("/");

  if (pathAsArray[0] === "" && base[base.length - 1] === "/") {
    pathAsArray.shift();
  }

  return baseAsArray.join("/") + pathAsArray.join("/");
}
