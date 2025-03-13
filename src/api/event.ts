import { getSettings } from "../settings";
import query from "./query";

type EventParams = Gtag.GtagCommands["event"];
type Params = Gtag.ControlParams & Gtag.EventParams & Gtag.CustomParams;

export default function event(...args: EventParams) {
  const { groupName, additionalAccounts } = getSettings();
  const name = args[0];
  const params: Params = args[1] ?? {};

  if (params.send_to === undefined && additionalAccounts?.length) {
    params.send_to = groupName;
  }

  query("event", name, params);
}
