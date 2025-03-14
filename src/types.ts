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

export type Item = {
  item_id?: string;
  item_name?: string;
  affiliation?: string;
  coupon?: string;
  discount?: string;
  index?: number;
  item_brand?: string;
  item_category?: string;
  item_category2?: string;
  item_category3?: string;
  item_category4?: string;
  item_category5?: string;
  item_list_id?: string;
  item_list_name?: string;
  item_variant?: string;
  location_id?: string;
  price?: number;
  quantity?: number;
};

export type Ecommerce = {
  transaction_id?: string;
  value?: number;
  currency?: string;
  coupon?: string;
  shipping?: number;
  tax?: number;
  items?: Item[];
};
