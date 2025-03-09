import event from "@/gtag/event";

export default function purchase(params: Gtag.EventParams) {
  event("purchase", params);
}
