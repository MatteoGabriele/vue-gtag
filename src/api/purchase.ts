import event from "./event";

export default function purchase(params: Gtag.EventParams) {
  event("purchase", params);
}
