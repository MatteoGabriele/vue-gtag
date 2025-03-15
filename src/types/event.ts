import type { EcommerceEventName } from "./ecommerce";

type GtagEventName =
  | "checkout_progress"
  | "earn_virtual_currency"
  | "exception"
  | "generate_lead"
  | "join_group"
  | "level_end"
  | "level_start"
  | "level_up"
  | "login"
  | "page_view"
  | "post_score"
  | "screen_view"
  | "search"
  | "select_content"
  | "set_checkout_option"
  | "share"
  | "sign_up"
  | "spend_virtual_currency"
  | "tutorial_begin"
  | "tutorial_complete"
  | "unlock_achievement"
  | "timing_complete"
  | "view_search_results";

export type EventNames = EcommerceEventName | GtagEventName;
