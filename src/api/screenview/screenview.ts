import { type Route, getSettings } from "../../core/settings";
import { query } from "../query";

export type Screenview = {
  app_name?: string;
  screen_name?: string;
};

export type ScreenviewParams = string | Route | Screenview;

export function screenview(params: ScreenviewParams) {
  const { appName } = getSettings();

  let template: Screenview = {};

  if (typeof params === "string") {
    template.screen_name = params;
  } else if ("path" in params) {
    template.screen_name = (params.name ?? params.path) as string;
  } else {
    template = params;
  }

  if (appName && template?.app_name === undefined) {
    template.app_name = appName;
  }

  query("event", "screen_view", template);
}
