import event from "./event";

type RefundParams =
  | {
      transaction_id?: string;
      value?: number;
      currency?: string;
      items?: Array<{
        id?: string;
        name?: string;
        quantity?: number;
        price?: number;
      }>;
    }
  | Gtag.CustomParams;

export default function refund(params: RefundParams) {
  event("refund", params);
}
