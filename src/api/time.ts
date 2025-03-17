import type { GtagEventParams } from "src/types/gtag";
import event from "./event";

export default function time(params: GtagEventParams) {
  event("timing_complete", params);
}
