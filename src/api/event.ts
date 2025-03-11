import query from "@/api/query";

type EventParams = Gtag.GtagCommands["event"];

export default function event(...args: EventParams) {
  query("event", ...args);
}
