import { config } from "@/api/config";
import type { GtagCustomParams } from "@/types/gtag";

export function customMap(params: GtagCustomParams) {
  config({
    custom_map: params,
  });
}
