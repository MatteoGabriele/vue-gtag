import type { GtagOptions } from "@/types";

declare global {
  interface Window {
    [gtag: GtagOptions["globalObjectName"]]: Gtag.Gtag;
    [dataLayer: GtagOptions["globalDataLayerName"]]: Parameters<Gtag.Gtag>;
  }
}
