import type { GtagCommands } from "src/types/gtag";
import query from "./query";

type SetParams = GtagCommands["set"];

export default function set(...args: SetParams) {
  query("set", ...args);
}
