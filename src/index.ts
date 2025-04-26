export { config } from "@/api/config";
export { consent, consentDeniedAll, consentGrantedAll } from "@/api/consent";
export { customMap } from "@/api/custom-map";
export { ecommerce } from "@/api/ecommerce";
export { event } from "@/api/event";
export { exception } from "@/api/exception";
export { linker } from "@/api/linker";
export { optIn, optOut } from "@/api/opt";
export { pageview } from "@/api/pageview";
export { query } from "@/api/query";
export { screenview } from "@/api/screenview";
export { set } from "@/api/set";
export { time } from "@/api/time";

export { useConsent } from "@/composables/use-consent";

export { addGtag } from "@/core/add-gtag";
export { createGtag } from "@/core/create-gtag";
export { configure } from "@/core/create-gtag";

export type { PluginSettings } from "@/types/settings";
