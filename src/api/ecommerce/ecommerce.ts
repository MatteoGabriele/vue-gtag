import type {
  GtagEcommerceEventNames,
  GtagEcommerceParams,
} from "../../types/gtag";
import { event } from "../event";

export function ecommerce(
  name: GtagEcommerceEventNames,
  params: GtagEcommerceParams,
) {
  event(name, params);
}
