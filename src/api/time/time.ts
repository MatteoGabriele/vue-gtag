import type { GtagEventParams } from "../../types/gtag";
import { event } from "../event";

export function time(params: GtagEventParams): void {
  event("timing_complete", params);
}
