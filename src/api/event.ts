import query from "@/gtag/query";

type EventParams = Gtag.GtagCommands["event"];

export default function event(...args: EventParams) {
  query("event", ...args);
}
