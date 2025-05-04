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

export function urlQueryReplace(queryParams: Record<string, string>): void {
  if (isServer()) {
    return;
  }

  const url = new URL(window.location.href);

  url.search = "";

  for (const [key, value] of Object.entries(queryParams)) {
    url.searchParams.set(key, value);
  }

  window.history.replaceState({}, "", url.toString());
}

const UTM_PREFIX = "utm_";

type QueryParams = Record<string, string>;
type UseUtmParams = {
  utmParams: QueryParams;
  cleanQueryParams: QueryParams;
  cleanUrl: string;
};

export function useUtmParams(url: string): UseUtmParams {
  const urlObject = new URL(url);
  const utmParams: Record<string, string> = {};
  const params: string[] = [];
  const cleanQueryParams: Record<string, string> = {};

  urlObject.searchParams.forEach((value, key) => {
    if (key.includes(UTM_PREFIX)) {
      // Replace "campaign" with "id" to match Google Analytics campaign parameter naming
      utmParams[key.replace(UTM_PREFIX, "").replace("campaign", "id")] = value;
      params.push(key);
    } else {
      cleanQueryParams[key] = value;
    }
  });

  for (const utmParam of params) {
    urlObject.searchParams.delete(utmParam);
  }

  return {
    utmParams,
    cleanQueryParams,
    cleanUrl: urlObject.toString(),
  };
}

export function hasUtmParams(url: string): boolean {
  const utmRegex = new RegExp(`[?&]${UTM_PREFIX}`);
  return !!url.match(utmRegex);
}

export function getPathWithBase(path: string, base: string): string {
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  const normalizedPath = path.startsWith("/") ? path.substring(1) : path;

  return `${normalizedBase}${normalizedPath}`;
}
