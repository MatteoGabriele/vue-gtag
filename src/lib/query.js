export default function(method, ...args) {
  if (typeof window === "undefined") {
    return;
  }

  window.gtag(method, ...args);
}
