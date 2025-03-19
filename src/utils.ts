export default function isServer(): boolean {
  return typeof window === "undefined" || typeof document === "undefined";
}

export async function injectScript(
  url: string,
  options?: {
    preconnect?: boolean;
    defer?: boolean;
    nonce?: string;
  },
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (isServer()) {
      return resolve();
    }

    const head = document.head;
    const script = document.createElement("script");

    script.async = true;
    script.src = url;

    if (options?.defer) {
      script.defer = true;
    }

    if (options?.nonce) {
      script.setAttribute("nonce", options.nonce);
    }

    if (options?.preconnect) {
      const link = document.createElement("link");

      const resource = new URL(url);

      link.href = resource.origin;
      link.rel = "preconnect";

      head.appendChild(link);
    }

    head.appendChild(script);

    script.onload = () => resolve();
    script.onerror = reject;
  });
}

export function hasGtag(): boolean {
  if (isServer()) {
    return false;
  }

  const match = document.querySelector(
    "script[src*='googletagmanager.com/gtag/js']",
  );

  return match !== null;
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
