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

      document.head.appendChild(link);
    }

    const script = document.createElement("script");
    script.defer = defer;
    script.src = src;
    script.async = true;

    script.onload = () => resolve();
    script.onerror = (err) => reject(err);

    document.head.appendChild(script);
  });
};

export const getPathWithBase = (path = "", base = "") => {
  const pathAsArray = path.split("/");
  const baseAsArray = base.split("/");

  if (pathAsArray[0] === "" && base[base.length - 1] === "/") {
    pathAsArray.shift();
  }

  return baseAsArray.join("/") + pathAsArray.join("/");
};
