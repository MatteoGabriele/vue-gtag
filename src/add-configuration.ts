import query from "@/gtag/query";
import { getConfig } from "./config";

export default function addConfiguration(): void {
  const { tagId, config } = getConfig();

  if (!tagId) {
    return;
  }

  query("config", tagId, config);
}
