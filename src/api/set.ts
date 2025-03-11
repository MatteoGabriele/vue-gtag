import query from "@/api/query";

type SetParams = Gtag.GtagCommands["set"];

export default function set(...args: SetParams) {
  query("set", ...args);
}
