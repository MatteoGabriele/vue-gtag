import type { PageviewParams } from "./gtag/pageview";
import type { ScreenviewParams } from "./gtag/screenview";

export type {
  RouteLocationNormalizedGeneric as Route,
  Router,
} from "vue-router";

export type Tail<T> = T extends [infer _, ...infer U] ? U : never;

export type PageTrackerParams = PageviewParams | ScreenviewParams;
