import type { Pageview } from "./api/pageview";
import type { Screenview } from "./api/screenview";

export type {
  RouteLocationNormalizedGeneric as Route,
  Router,
} from "vue-router";

export type Tail<T> = T extends [infer _, ...infer U] ? U : never;

export type PageTrackerParams = Pageview | Screenview;

export type CustomParams = {
  // biome-ignore lint/suspicious/noExplicitAny:
  [key: string]: any;
};

export type ParamsWithCustom<T> = T | CustomParams;
