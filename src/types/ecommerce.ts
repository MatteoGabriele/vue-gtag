export type EcommerceEventName =
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

export type EcommerceItem = {
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

export type EcommerceParams = {
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
  items?: EcommerceItem[];
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
