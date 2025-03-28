import { query } from "@/api/query";
import { getSettings } from "@/core/settings";
import type {
  GtagControlParams,
  GtagCustomParams,
  GtagEventNames,
  GtagEventParams,
} from "@/types/gtag";

type EventParams = GtagControlParams & GtagEventParams & GtagCustomParams;

export function event(name: GtagEventNames, params: EventParams) {
  const { groupName, additionalAccounts } = getSettings();

  if (params.send_to === undefined && additionalAccounts?.length) {
    params.send_to = groupName;
  }

  query("event", name, params);
}
