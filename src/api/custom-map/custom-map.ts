import type { GtagCustomParams } from "../../types/gtag";
import { config } from "../config";

export function customMap(params: GtagCustomParams): void {
  config({
    custom_map: params,
  });
}
