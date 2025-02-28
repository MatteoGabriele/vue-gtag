export default function isServer(): boolean {
  return typeof window === "undefined" || typeof document === "undefined";
}

export async function injectScript(
  url: string,
  options?: {
    preconnectOrigin?: string;
    defer?: boolean;
  },
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (isServer()) {
      return;
    }

    const head = document.head;
    const script = document.createElement("script");

    script.async = true;
    script.src = url;

    if (options?.defer) {
      script.defer = true;
    }

    if (options?.preconnectOrigin) {
      const link = document.createElement("link");

      link.href = options.preconnectOrigin;
      link.rel = "preconnect";

      head.appendChild(link);
    }

    head.appendChild(script);

    script.onload = () => resolve;
    script.onerror = reject;
  });
}
