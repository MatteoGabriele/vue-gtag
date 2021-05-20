declare module "vue-gtag" {
  import type { App } from "vue";
  import type { Router } from "vue-router";

  /**
   * Types copied from @types/gtag.js.
   *
   * @see https://www.npmjs.com/package/@types/gtag.js
   */
  namespace Gtag {
    interface Gtag {
      (command: 'config', targetId: string, config?: ControlParams | EventParams | CustomParams): void;
      (command: 'set', config: CustomParams): void;
      (command: 'js', config: Date): void;
      (command: 'event', eventName: EventNames | string, eventParams?: ControlParams | EventParams | CustomParams): void;
    }

    interface CustomParams {
      [key: string]: any;
    }

    interface ControlParams {
      groups?: string | string[];
      send_to?: string | string[];
      event_callback?: () => void;
      event_timeout?: number;
    }

    type EventNames = 'add_payment_info'
      | 'add_to_cart'
      | 'add_to_wishlist'
      | 'begin_checkout'
      | 'checkout_progress'
      | 'exception'
      | 'generate_lead'
      | 'login'
      | 'page_view'
      | 'purchase'
      | 'refund'
      | 'remove_from_cart'
      | 'screen_view'
      | 'search'
      | 'select_content'
      | 'set_checkout_option'
      | 'share'
      | 'sign_up'
      | 'timing_complete'
      | 'view_item'
      | 'view_item_list'
      | 'view_promotion'
      | 'view_search_results';

    interface EventParams {
      checkout_option?: string;
      checkout_step?: number;
      content_id?: string;
      content_type?: string;
      coupon?: string;
      currency?: string;
      description?: string;
      fatal?: boolean;
      items?: Item[];
      method?: string;
      number?: string;
      promotions?: Promotion[];
      screen_name?: string;
      search_term?: string;
      shipping?: Currency;
      tax?: Currency;
      transaction_id?: string;
      value?: number;
      event_label?: string;
      event_category?: string;
      non_interaction?: boolean
    }

    type Currency = string | number;

    interface Item {
      brand?: string;
      category?: string;
      creative_name?: string;
      creative_slot?: string;
      id?: string;
      location_id?: string;
      name?: string;
      price?: Currency;
      quantity?: number;
    }

    interface Promotion {
      creative_name?: string;
      creative_slot?: string;
      id?: string;
      name?: string;
    }
  }

  export interface PageView {
    /** The page's title. */
    page_title?: string;
    /** The page's URL. */
    page_location?: string;
    /** The path portion of location. This value must start with a slash (/) character. */
    page_path?: string;
  }

  export interface ScreenView {
    /** The name of the screen. */
    screen_name: string;
    /** The name of the application. */
    app_name: string;
  }

  /**
   * @see https://developers.google.com/analytics/devguides/collection/gtagjs/enhanced-ecommerce#action_data
   */
  export interface EcommerceAction {
    /** Unique ID for the transaction. */
    transaction_id: string;
    /** The store or affiliation from which this transaction occurred */
    affiliation?: string;
    /** Value (i.e., revenue) associated with the event */
    value?: number;
    /** Tax amount */
    tax?: number;
    /** Shipping cost */
    shipping?: number;
    /** The array containing the associated products */
    items?: Gtag.Item[];
    /** The step (a number) in the checkout process */
    checkout_step?: number;
    /** Checkout option (i.e. selected payment method) */
    checkout_option?: string;
  }

  export interface Linker {
    domains: string[];
    decorate_forms?: boolean;
    accept_incoming?: boolean;
    url_position?: "fragment" | "query";
  }

  export interface Exception {
    /** A description of the error. */
    description?: string;
    /** true if the error was fatal. */
    fatal?: boolean;
  }

  export interface Timing {
    /** A string to identify the variable being recorded (e.g. 'load'). */
    name: string;
    /** The number of milliseconds in elapsed time to report to Google Analytics (e.g. 20). */
    value: number;
    /** A string for categorizing all user timing variables into logical groups (e.g. 'JS Dependencies'). */
    event_category?: string;
    /** A string that can be used to add flexibility in visualizing user timings in the reports (e.g. 'Google CDN'). */
    event_label?: string;
  }

  export type GtagOptIO = () => void;

  /**
   * Send a Google Analytics Event.
   *
   * @see https://developers.google.com/analytics/devguides/collection/gtagjs/events
   *
   * @param action string that will appear as the event action in Google Analytics Event reports
   * @param eventParams
   */
  export type GtagEvent = (action: Gtag.EventNames | string, eventParams?: Gtag.ControlParams | Gtag.EventParams | Gtag.CustomParams) => void;

  /**
   * Send an ad-hoc Google Analytics pageview.
   *
   * @see https://developers.google.com/analytics/devguides/collection/gtagjs/pages
   */
  export type GtagPageView = (pageView: PageView) => void;

  /**
   * Send a Google Analytics screen view.
   *
   * @see https://developers.google.com/analytics/devguides/collection/gtagjs/screens
   */
  export type GtagScreenView = (screenView: ScreenView) => void;

  /**
   * Configure a map of custom dimensions and metrics.
   *
   * @see https://developers.google.com/analytics/devguides/collection/gtagjs/custom-dims-mets
   */
  export type GtagCustomMap = (map: Dictionary<string>) => void;

  /**
   * Measure a transaction.
   *
   * @see https://developers.google.com/analytics/devguides/collection/gtagjs/enhanced-ecommerce#measure_purchases
   */
  export type GtagPurchase = (purchase: EcommerceAction) => void;

  /**
   * Send user timing information to Google Analytics.
   *
   * @see https://developers.google.com/analytics/devguides/collection/gtagjs/user-timings
   */
  export type GtagTime = (timing: Timing) => void;

  /**
   * Measure an exception.
   *
   * @see https://developers.google.com/analytics/devguides/collection/gtagjs/exceptions
   */
  export type GtagException = (ex: Exception) => void;

  /**
   * Automatically link domains.
   *
   * @see https://developers.google.com/analytics/devguides/collection/gtagjs/cross-domain#automatically_link_domains
   */
  export type GtagLinker = (config: Linker) => void;

  /**
   * Set parameters that will be associated with every subsequent event on the page.
   *
   * @see https://developers.google.com/gtagjs/devguide/configure#send_data_on_every_event_with_set
   */
  export type GtagSet = (config: Gtag.CustomParams) => void;

  /**
   * Initialize and configure settings for a particular product account.
   *
   * @see https://developers.google.com/gtagjs/devguide/configure
   */
  export type GtagConfig = (config?: Gtag.ControlParams | Gtag.EventParams | Gtag.CustomParams) => void;

  /**
   * Measure a full refund of a transaction.
   *
   * @see https://developers.google.com/analytics/devguides/collection/gtagjs/enhanced-ecommerce#measure_refunds
   */
  export type GtagRefund = (refund: EcommerceAction) => void;

  export type Dictionary<T> = { [key: string]: T };

  export interface VueGtag {
    query: Gtag.Gtag;
    optIn: GtagOptIO;
    optOut: GtagOptIO;
    pageview: GtagPageView;
    event: GtagEvent;
    screenview: GtagScreenView;
    customMap: GtagCustomMap;
    purchase: GtagPurchase;
    refund: GtagRefund;
    linker: GtagLinker;
    exception: GtagException;
    set: GtagSet;
    config: GtagConfig;
    time: GtagTime;
  }

  export interface DomainConfig {
    id: string;
    params?: Gtag.ControlParams | Gtag.EventParams | Gtag.CustomParams;
  }

  export interface PluginOptions {
    appName?: string;
    pageTrackerTemplate?: () => PageView;
    onBeforeTrack?: () => void;
    onAfterTrack?: () => void;
    onReady?: () => void;
    enabled?: boolean;
    disableScriptLoad?: boolean;
    bootstrap?: boolean;
    globalObjectName?: string;
    pageTrackerEnabled?: boolean;
    pageTrackerScreenviewEnabled?: boolean;
    defaultGroupName?: string;
    includes?: DomainConfig[];
    config?: DomainConfig;
  }

  export class VueGtagPlugin {
    static install(
      app: App,
      options: PluginOptions,
      router?: Router
    ): void;
  }

  export function bootstrap(): Promise<Gtag.Gtag>;
  export function setOptions(options: PluginOptions): void;

  export default VueGtagPlugin;
  export const query: Gtag.Gtag;
  export const config: GtagConfig;
  export const event: GtagEvent;
  export const pageview: GtagPageView;
  export const screenview: GtagScreenView;
  export const customMap: GtagCustomMap;
  export const time: GtagTime;
  export const exception: GtagException;
  export const linker: GtagLinker;
  export const purchase: GtagPurchase;
  export const set: GtagSet;
  export const optIn: GtagOptIO;
  export const optOut: GtagOptIO;
  export const refund: GtagRefund;

  module "vue/types/vue" {
    interface Vue {
      $gtag: VueGtag;
    }
  }
}
