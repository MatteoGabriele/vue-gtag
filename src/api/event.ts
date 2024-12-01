import query from "./query";

type EventName = Gtag.EventNames;
type EventParams =
  | Gtag.ControlParams
  | Gtag.EventParams
  | Gtag.CustomParams
  | Gtag.ConfigParams;

const event = (eventName: EventName, eventParams: EventParams): void => {
  query("event", eventName, eventParams);
};

export default event;
