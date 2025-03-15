import { getSettings } from "../settings";
import type { EventNames } from "../types/event";
import query from "./query";

type EventParams = Gtag.ControlParams & Gtag.EventParams & Gtag.CustomParams;

export default function event(name: EventNames, params: EventParams) {
  const { groupName, additionalAccounts } = getSettings();

  if (params.send_to === undefined && additionalAccounts?.length) {
    params.send_to = groupName;
  }

  query("event", name, params);
}
