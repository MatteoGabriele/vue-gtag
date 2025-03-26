import type { GtagCommands } from "../../types/gtag";
import { query } from "../query";

type SetParams = GtagCommands["set"];

export default function set(...args: SetParams) {
  query("set", ...args);
}
