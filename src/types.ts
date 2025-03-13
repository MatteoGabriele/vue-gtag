import type { Pageview } from "./api/pageview";
import type { Screenview } from "./api/screenview";

export type {
  RouteLocationNormalizedGeneric as Route,
  Router,
} from "vue-router";

export type Tail<T> = T extends [infer _, ...infer U] ? U : never;

export type PageTrackerParams = Pageview | Screenview;
