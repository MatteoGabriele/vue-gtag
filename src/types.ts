import type { RouteLocationNormalizedGeneric } from "vue-router";

export type Tail<T> = T extends [infer _, ...infer U] ? U : never;

export type Route = RouteLocationNormalizedGeneric;
