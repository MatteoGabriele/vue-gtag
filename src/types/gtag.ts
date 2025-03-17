export type GtagCommands = {
  config: [
    targetId: string,
    config?:
      | GtagControlParams
      | GtagEventParams
      | GtagConfigParams
      | GtagCustomParams,
  ];
  set:
    | [targetId: string, config: GtagCustomParams | boolean | string]
    | [config: GtagCustomParams];
  js: [config: Date];
  event: [
    eventName: GtagEventNames | (string & {}),
    eventParams?: GtagControlParams | GtagEventParams | GtagCustomParams,
  ];
  get: [
    targetId: string,
    fieldName: GtagFieldNames | string,
    // biome-ignore lint/suspicious/noExplicitAny:
    callback?: (field?: string | GtagCustomParams) => any,
  ];
  consent: [
    consentArg: GtagConsentArg | (string & {}),
    consentParams: GtagConsentParams,
  ];
};

export type Gtag = <Command extends keyof GtagCommands>(
  command: Command,
  ...args: GtagCommands[Command]
) => void;

// biome-ignore lint/suspicious/noExplicitAny:
export type GtagCustomParams = Record<string, any>;

export type GtagConfigParams = {
  page_title?: string;
  page_location?: string;
  page_path?: string;
  send_page_view?: boolean;
};

export type GtagControlParams = {
  groups?: string | string[];
  send_to?: string | string[];
  event_callback?: () => void;
  event_timeout?: number;
};

export type GtagEventNames =
  | "add_payment_info"
  | "add_shipping_info"
  | "add_to_cart"
  | "add_to_wishlist"
  | "begin_checkout"
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
  | "purchase"
  | "refund"
  | "remove_from_cart"
  | "screen_view"
  | "search"
  | "select_content"
  | "select_item"
  | "select_promotion"
  | "set_checkout_option"
  | "share"
  | "sign_up"
  | "spend_virtual_currency"
  | "tutorial_begin"
  | "tutorial_complete"
  | "unlock_achievement"
  | "timing_complete"
  | "view_cart"
  | "view_item"
  | "view_item_list"
  | "view_promotion"
  | "view_search_results";

export type GtagEventParams = {
  checkout_option?: string;
  checkout_step?: number;
  content_id?: string;
  content_type?: string;
  coupon?: string;
  currency?: string;
  description?: string;
  fatal?: boolean;
  items?: GtagItem[];
  method?: string;
  number?: string;
  promotions?: GtagPromotion[];
  screen_name?: string;
  search_term?: string;
  shipping?: GtagCurrency;
  tax?: GtagCurrency;
  transaction_id?: string;
  value?: number;
  event_label?: string;
  event_category?: string;
};

type GtagCurrency = string | number;

/**
 * Interface of an item object used in lists for this event.
 *
 * Reference:
 * @see {@link https://developers.google.com/analytics/devguides/collection/ga4/reference/events#view_item_item view_item_item}
 * @see {@link https://developers.google.com/analytics/devguides/collection/ga4/reference/events#view_item_list_item view_item_list_item}
 * @see {@link https://developers.google.com/analytics/devguides/collection/ga4/reference/events#select_item_item select_item_item}
 * @see {@link https://developers.google.com/analytics/devguides/collection/ga4/reference/events#add_to_cart_item add_to_cart_item}
 * @see {@link https://developers.google.com/analytics/devguides/collection/ga4/reference/events#view_cart_item view_cart_item}
 */
type GtagItem = {
  item_id?: string;
  item_name?: string;
  affiliation?: string;
  coupon?: string;
  currency?: string;
  creative_name?: string;
  creative_slot?: string;
  discount?: GtagCurrency;
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
  price?: GtagCurrency;
  promotion_id?: string;
  promotion_name?: string;
  quantity?: number;
};

type GtagPromotion = {
  creative_name?: string;
  creative_slot?: string;
  promotion_id?: string;
  promotion_name?: string;
};

type GtagFieldNames = "client_id" | "session_id" | "gclid";

type GtagConsentArg = "default" | "update";

/**
 * Reference:
 * @see {@link https://support.google.com/tagmanager/answer/10718549#consent-types consent-types}
 * @see {@link https://developers.google.com/tag-platform/security/guides/consent consent}
 */
type GtagConsentParams = {
  ad_personalization?: "granted" | "denied";
  ad_user_data?: "granted" | "denied";
  ad_storage?: "granted" | "denied";
  analytics_storage?: "granted" | "denied";
  functionality_storage?: "granted" | "denied";
  personalization_storage?: "granted" | "denied";
  security_storage?: "granted" | "denied";
  wait_for_update?: number;
  region?: string[];
};
