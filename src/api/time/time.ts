import type { GtagEventParams } from "../../types/gtag";
import { event } from "../event";

export default function time(params: GtagEventParams) {
  event("timing_complete", params);
}
