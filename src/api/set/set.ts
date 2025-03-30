import { query } from "@/api/query";
import type { GtagCommands } from "@/types/gtag";

type SetParams = GtagCommands["set"];

export function set(...args: SetParams) {
  query("set", ...args);
}
