type LoadScriptOptions = {
  defer?: boolean;
  preconnectOrigin?: string;
};

export const loadScript = async (
  src: string,
  { defer = true, preconnectOrigin }: LoadScriptOptions = {},
): Promise<void> => {
  if (typeof document === "undefined" || typeof window === "undefined") {
    return;
  }

  return new Promise((resolve, reject) => {
    if (preconnectOrigin) {
      const link = document.createElement("link");
      link.rel = "preconnect";
      link.href = preconnectOrigin;

      document.body.appendChild(link);
    }

    const script = document.createElement("script");
    script.defer = defer;
    script.src = src;
    script.async = true;

    script.onload = () => resolve();
    script.onerror = (err) => reject(err);

    document.body.appendChild(script);
  });
};
