import type { GtagCustomParams } from "src/types/gtag";
import config from "./config";

export default function customMap(params: GtagCustomParams) {
  config({
    custom_map: params,
  });
}
