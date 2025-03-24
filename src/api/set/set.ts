import type { GtagCommands } from "../../types/gtag";
import { query } from "../query";

type SetParams = GtagCommands["set"];

export function set(...args: SetParams): void {
  query("set", ...args);
}
