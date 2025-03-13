import { getSettings } from "../settings";
import type { Route } from "../types";
import query from "./query";

export type Screenview = {
  app_name?: string;
  screen_name?: string;
};

export type ScreenviewParams = string | Route | Screenview;

export default function screenview(params: ScreenviewParams) {
  const { pageTracker } = getSettings();

  const template: Screenview = { screen_name: undefined };

  if (typeof params === "string") {
    template.screen_name = params;
  } else if ("path" in params) {
    template.screen_name = (params.name ?? params.path) as string;
  } else if ("screen_name" in params) {
    template.screen_name = params.screen_name;
  }

  if (pageTracker?.appName && template?.app_name === undefined) {
    template.app_name = pageTracker.appName;
  }

  query("event", "screen_view", template);
}
