export const noop = function () {};

const SCHEME_DEFAULT_PORTS = Object.freeze({
  "ftp://": 21,
  "http://": 80,
  "https://": 443,
});

export function loadScript(url, domain) {
  return new Promise((resolve, reject) => {
    const head = document.head || document.getElementsByTagName("head")[0];
    const script = document.createElement("script");

    script.async = true;
    script.src = url;
    script.charset = "utf-8";

    if (domain) {
      const link = document.createElement("link");

      link.href = domain;
      link.rel = "preconnect";

      head.appendChild(link);
    }

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

export function getUrlOrigin(url) {
  if (typeof url !== "string") {
    throw new Error("Parameter url must be a string");
  }
  if (url.indexOf("blob:") === 0) {
    url = url.substring(5);
  }

  const scheme = getUrlScheme(url);
  const domainPortPart = getUrlDomainPortPart(url, scheme);
  const { domainPart, portPart } = getUrlDomainAndPort(domainPortPart, scheme);

  return scheme + domainPart + portPart;
}

function getUrlScheme(url) {
  const scheme = Object.keys(SCHEME_DEFAULT_PORTS).find(
    (schemeToBeTested) => url.indexOf(schemeToBeTested) === 0
  );
  if (scheme === undefined) {
    throw new Error("Unsupported URL scheme.");
  }
  return scheme;
}

function getUrlDomainPortPart(url, scheme) {
  const remainingUrl = url.substring(scheme.length);

  let domainPortEndIndex = remainingUrl.indexOf("/");
  if (domainPortEndIndex === -1) {
    domainPortEndIndex = remainingUrl.length;
  }

  return remainingUrl.substring(0, domainPortEndIndex);
}

function getUrlDomainAndPort(domainPortPart, scheme) {
  let domainPart;
  let portPart;
  const colonIndex = domainPortPart.indexOf(":");
  if (colonIndex !== -1) {
    domainPart = domainPortPart.substring(0, colonIndex);
    portPart = domainPortPart.substring(colonIndex + 1);
  } else {
    domainPart = domainPortPart;
    portPart = "";
  }

  portPart = checkAndGetPortPart(portPart, SCHEME_DEFAULT_PORTS[scheme]);

  return { domainPart, portPart };
}

function checkAndGetPortPart(portPart, schemeDefaultPort) {
  if (portPart === "") return portPart;

  const portNumber = parseInt(portPart);
  if (isNaN(portNumber) || "" + portNumber !== portPart) {
    throw new Error("Invalid port number in the URL.");
  }
  if (portNumber > 65535 || portNumber < 0) {
    throw new Error("Port number is out of range.");
  }

  if (schemeDefaultPort === portNumber) {
    return "";
  } else {
    return ":" + portPart;
  }
}
