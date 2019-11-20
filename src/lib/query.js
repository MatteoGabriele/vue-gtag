import { options } from "../install";

export default function(method, ...args) {
  const { config } = options;
  window.gtag(method, config.id, ...args);
}
