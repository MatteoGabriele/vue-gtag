import query from "./gtag/query";
import { getSettings } from "./settings";

export default async function addRouterTracking(): Promise<void> {
  const { router } = getSettings();

  if (!router) {
    return;
  }

  await router.isReady();

  query("event", "page_view", { page_path: "/" });
}
