import event from "./event";

export default function time(params: Gtag.EventParams) {
  event("timing_complete", params);
}
