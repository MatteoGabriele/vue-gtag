import { getSettings } from "../settings";
import query from "./query";

type EventNames = Gtag.EventNames;
type EventParams = Gtag.ControlParams & Gtag.EventParams & Gtag.CustomParams;

export default function event(name: EventNames, params: EventParams) {
  const { groupName, additionalAccounts } = getSettings();

  if (params.send_to === undefined && additionalAccounts?.length) {
    params.send_to = groupName;
  }

  query("event", name, params);
}
