export function isServer(): boolean {
  return typeof window === "undefined" || typeof document === "undefined";
}

export type InjectScriptOptions = {
  preconnect?: boolean;
  defer?: boolean;
  nonce?: string;
  type?: string;
};

export async function injectScript(
  url: string,
  options?: InjectScriptOptions,
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (isServer()) {
      return resolve();
    }

    const head = document.head;
    const script = document.createElement("script");

    script.async = true;
    script.src = url;
    script.type = options?.type ?? "text/javascript";

    if (options?.defer) {
      script.defer = true;
    }

    if (options?.nonce) {
      script.setAttribute("nonce", options.nonce);
    }

    if (options?.preconnect) {
      const link = document.createElement("link");
      const urlObj: URL = new URL(url);

      link.href = urlObj.origin;
      link.rel = "preconnect";

      head.appendChild(link);
    }

    head.appendChild(script);

    script.onload = () => resolve();
    script.onerror = (error) => reject(error);
  });
}

type DeepMergeable = {
  [key: string]: unknown;
};

function isObject(obj: unknown): obj is DeepMergeable {
  return obj !== null && typeof obj === "object" && !Array.isArray(obj);
}

export function deepMerge<T extends DeepMergeable, U extends DeepMergeable>(
  target: T,
  source: U,
): T & U {
  const output: DeepMergeable = { ...target };

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const sourceValue = source[key];
      const targetValue = target[key];

      if (isObject(sourceValue) && isObject(targetValue)) {
        output[key] = deepMerge(targetValue, sourceValue);
      } else {
        output[key] = sourceValue;
      }
    }
  }

  return output as T & U;
}

type UseUtmParams = {
  utmParams: Record<string, string>;
  cleanUrl: string;
};

const UTM_PREFIX = "utm_";

export function hasUtmParams(pageviewUrl: string): boolean {
  const utmRegex = new RegExp(`[?&]${UTM_PREFIX}`);
  return !!pageviewUrl.match(utmRegex);
}

export function useUtmParams(pageviewUrl: string): UseUtmParams {
  const url = new URL(pageviewUrl);
  const utmParams: Record<string, string> = {};
  const params: string[] = [];

  url.searchParams.forEach((value, key) => {
    if (key.includes(UTM_PREFIX)) {
      utmParams[key.replace(UTM_PREFIX, "")] = value;
      params.push(key);
    }
  });

  for (const utmParam of params) {
    url.searchParams.delete(utmParam);
  }

  return {
    utmParams,
    cleanUrl: url.toString(),
  };
}

export function getPathWithBase(path: string, base: string): string {
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  const normalizedPath = path.startsWith("/") ? path.substring(1) : path;

  return `${normalizedBase}${normalizedPath}`;
}
