export type GtagConfig =
  | GtagControlParams
  | GtagEventParams
  | GtagConfigParams
  | GtagCustomParams;

/**
 * Defines the available Google Tag (gtag) commands and their respective parameters.
 */
export type GtagCommands = {
  /** Configures the Google Tag with an optional set of parameters. */
  config: [
    /** The tracking ID or measurement ID. */
    targetId: string,
    /** Optional configuration parameters. */
    config?: GtagConfig,
  ];

  /** Sets custom parameters or updates existing values. */
  set:
    | [targetId: string, config: GtagCustomParams | boolean | string]
    | [config: GtagCustomParams];

  /** Initializes the Google Tag script. */
  js: [
    /** The date when the script was initialized. */
    config: Date,
  ];

  /** Logs an event with optional parameters. */
  event: [
    /** The name of the event being logged. */
    eventName: GtagEventNames | (string & {}),
    /** Optional parameters associated with the event. */
    eventParams?: GtagControlParams | GtagEventParams | GtagCustomParams,
  ];

  /** Retrieves values from the Google Tag system. */
  get: [
    /** The tracking ID or measurement ID. */
    targetId: string,
    /** The field name to retrieve. */
    fieldName: GtagFieldNames | string,
    /** Callback function to handle the retrieved value. */
    // biome-ignore lint/suspicious/noExplicitAny:
    callback?: (field?: string | GtagCustomParams) => any,
  ];

  /** Manages user consent settings. */
  consent: [
    /** The consent action being performed. */
    consentArg: GtagConsentArg | (string & {}),
    /** The consent parameters being updated. */
    consentParams: GtagConsentParams,
  ];
};

export type Gtag = <Command extends keyof GtagCommands>(
  command: Command,
  ...args: GtagCommands[Command]
) => void;

// biome-ignore lint/suspicious/noExplicitAny:
export type GtagCustomParams = Record<string, any>;

/**
 * Parameters for configuring Google Analytics tracking.
 */
export type GtagConfigParams = {
  /** The title of the page being tracked. */
  page_title?: string;
  /** The full URL of the page being tracked. */
  page_location?: string;
  /** The path of the page being tracked. */
  page_path?: string;
  /** Whether to send a page view event automatically. */
  send_page_view?: boolean;
};

/**
 * Control parameters for Google Tag events.
 */
export type GtagControlParams = {
  /** The groups to which the event belongs. */
  groups?: string | string[];
  /** The tracking IDs to which the event should be sent. */
  send_to?: string | string[];
  /** Callback function executed after the event is sent. */
  event_callback?: () => void;
  /** The timeout in milliseconds before the event callback is executed. */
  event_timeout?: number;
};

export type GtagEcommerceEventNames =
  | "refund"
  | "select_item"
  | "view_item"
  | "add_to_cart"
  | "view_item_list"
  | "add_shipping_info"
  | "add_payment_info"
  | "add_to_wishlist"
  | "view_cart"
  | "remove_from_cart"
  | "begin_checkout"
  | "purchase"
  | "view_promotion"
  | "select_promotion";

export type GtagGeneralEventNames =
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

export type GtagEventNames =
  | GtagEcommerceEventNames
  | GtagGeneralEventNames
  | (string & {});

/**
 * Parameters associated with Google Analytics events.
 */
export type GtagEventParams = {
  /** The option chosen during checkout. */
  checkout_option?: string;
  /** The step number in the checkout process. */
  checkout_step?: number;
  /** The unique identifier of the content. */
  content_id?: string;
  /** The type of content being interacted with. */
  content_type?: string;
  /** A discount coupon code. */
  coupon?: string;
  /** The currency used for the transaction. */
  currency?: string;
  /** A description of the event or product. */
  description?: string;
  /** Indicates if the event was fatal. */
  fatal?: boolean;
  /** The items associated with the event. */
  items?: GtagItem[];
  /** The payment or shipping method used. */
  method?: string;
  /** A unique number associated with the transaction. */
  number?: string;
  /** The promotions associated with the event. */
  promotions?: GtagPromotion[];
  /** The screen name where the event occurred. */
  screen_name?: string;
  /** The search term used. */
  search_term?: string;
  /** The shipping cost. */
  shipping?: GtagCurrency;
  /** The tax amount. */
  tax?: GtagCurrency;
  /** The transaction ID. */
  transaction_id?: string;
  /** The event value. */
  value?: number;
  /** The label for the event. */
  event_label?: string;
  /** The category for the event. */
  event_category?: string;
};

type GtagCurrency = string | number;

type GtagItem = {
  /** The ID of the item. */
  item_id?: string;
  /** The name of the item. */
  item_name?: string;
  /** A product affiliation to designate a supplying company or brick and mortar store location. */
  affiliation?: string;
  /** The coupon name/code associated with the item. */
  coupon?: string;
  /** The unit monetary discount value associated with the item. */
  discount?: number;
  /** The index/position of the item in a list. */
  index?: number;
  /** The brand of the item. */
  item_brand?: string;
  /**
   * The category of the item.
   * If used as part of a category hierarchy or taxonomy then this will be the first category.
   */
  item_category?: string;
  /** The second category hierarchy or additional taxonomy for the item. */
  item_category2?: string;
  /** The third category hierarchy or additional taxonomy for the item. */
  item_category3?: string;
  /** The fourth category hierarchy or additional taxonomy for the item. */
  item_category4?: string;
  /** The fifth category hierarchy or additional taxonomy for the item. */
  item_category5?: string;
  /**
   * The ID of the list in which the item was presented to the user.
   * If set, event-level item_list_id is ignored.
   * If not set, event-level item_list_id is used, if present.
   */
  item_list_id?: string;
  /**
   * The name of the list in which the item was presented to the user.
   * If set, event-level item_list_name is ignored.
   * If not set, event-level item_list_name is used, if present.
   */
  item_list_name?: string;
  /** The item variant or unique code or description for additional item details/options. */
  item_variant?: string;
  /**
   * The physical location associated with the item (e.g. the physical store location).
   * Recommended to use Google Place ID. Custom IDs are allowed.
   * Note: `location_id` is only available at the item-scope.
   */
  location_id?: string;
  /**
   * The monetary unit price of the item, in units of the specified currency.
   * If a discount applies, set this to the discounted unit price and specify the discount separately.
   */
  price?: number;
  /** Item quantity. Defaults to 1 if not set. */
  quantity?: number;
  /**
   * The name of the promotional creative slot associated with the item.
   * If set, event-level creative_slot is ignored.
   */
  creative_slot?: string;
  /**
   * The name of the promotional creative.
   * If set, event-level creative_name is ignored.
   */
  creative_name?: string;
  /**
   * The ID of the promotion associated with the item.
   * If set, event-level promotion_id is ignored.
   */
  promotion_id?: string;
  /**
   * The name of the promotion associated with the item.
   * If set, event-level promotion_name is ignored.
   */
  promotion_name?: string;
};

export type GtagEcommerceParams = {
  /** The unique transaction ID (order ID). */
  transaction_id?: string;
  /** The total monetary value of the event. */
  value?: number;
  /** The currency of the transaction, in ISO 4217 3-letter format (e.g., "USD"). */
  currency?: string;
  /** The coupon name/code applied to the event. */
  coupon?: string;
  /** The shipping cost associated with the transaction. */
  shipping?: number;
  /** The total tax amount associated with the transaction. */
  tax?: number;
  /** Array of items associated with the event. */
  items?: GtagItem[];
  /** Payment method used for the transaction (e.g., "Credit Card", "PayPal"). */
  payment_type?: string;
  /**
   * The name of the promotional creative associated with the event.
   * Ignored if set at the item-level.
   */
  creative_name?: string;
  /**
   * The creative slot name associated with the event.
   * Ignored if set at the item-level.
   */
  creative_slot?: string;
  /**
   * The ID of the promotion associated with the event.
   * Ignored if set at the item-level.
   */
  promotion_id?: string;
  /**
   * The name of the promotion associated with the event.
   * Ignored if set at the item-level.
   */
  promotion_name?: string;
};

type GtagPromotion = {
  /**
   * The name of the promotional creative.
   * If set, event-level creative_name is ignored.
   */
  creative_name?: string;
  /**
   * The name of the promotional creative slot associated with the item.
   * If set, event-level creative_slot is ignored.
   */
  creative_slot?: string;
  /**
   * The ID of the promotion associated with the item.
   * If set, event-level promotion_id is ignored.
   */
  promotion_id?: string;
  /**
   * The name of the promotion associated with the item.
   * If set, event-level promotion_name is ignored.
   */
  promotion_name?: string;
};

export type GtagFieldNames = "client_id" | "session_id" | "gclid";

export type GtagConsentMode = "granted" | "denied";
export type GtagConsentArg = "default" | "update";

export type GtagConsentParams = {
  /** Consent for ad personalization. */
  ad_personalization?: GtagConsentMode;
  /** Consent for ad user data. */
  ad_user_data?: GtagConsentMode;
  /** Consent for ad storage. */
  ad_storage?: GtagConsentMode;
  /** Consent for analytics storage. */
  analytics_storage?: GtagConsentMode;
  /** Consent for functionality storage. */
  functionality_storage?: GtagConsentMode;
  /** Consent for personalization storage. */
  personalization_storage?: GtagConsentMode;
  /** Consent for security storage. */
  security_storage?: GtagConsentMode;
  /** Time to wait for consent update in milliseconds. */
  wait_for_update?: number;
  /** The regions where the consent applies. */
  region?: string[];
};
