export async function injectScript(
  url: string,
  options?: {
    preconnectOrigin?: string;
    defer?: boolean;
  },
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof document === "undefined") {
      return;
    }

    const head = document.head || document.getElementsByTagName("head")[0];
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
