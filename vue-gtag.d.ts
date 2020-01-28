declare module "vue-gtag" {
  import _Vue, { PluginFunction } from "vue";
  import VueRouter from "vue-router";
  type Currency = string | number;

  type EventNames =
    | "add_payment_info"
    | "add_to_cart"
    | "add_to_wishlist"
    | "begin_checkout"
    | "checkout_progress"
    | "exception"
    | "generate_lead"
    | "login"
    | "page_view"
    | "purchase"
    | "refund"
    | "remove_from_cart"
    | "screen_view"
    | "search"
    | "select_content"
    | "set_checkout_option"
    | "share"
    | "sign_up"
    | "timing_complete"
    | "view_item"
    | "view_item_list"
    | "view_promotion"
    | "view_search_results";

  interface GtagPromotion {
    creative_name?: string;
    creative_slot?: string;
    id?: string;
    name?: string;
  }
  interface GtagItem {
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

  type GtagControlParams = {
    groups?: string | string[];
    send_to?: string | string[];
    event_callback?: () => void;
    event_timeout?: number;
  };

  type GtagEventParams = {
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
    shipping?: Currency;
    tax?: Currency;
    transaction_id?: string;
    value?: number;
    event_label?: string;
    event_category?: string;
  };
  interface CustomParams {
    [key: string]: any;
  }
  interface Gtag {
    (
      command: "config",
      targetId: string,
      config?: GtagControlParams | GtagEventParams | CustomParams
    ): void;
    (command: "set", config: CustomParams): void;
    (command: "js", config: Date): void;
    (
      command: "event",
      eventName: EventNames | string,
      eventParams?: GtagControlParams | GtagEventParams | CustomParams
    ): void;
  }
  type GtagGenericParams = GtagControlParams | GtagEventParams | CustomParams;

  export interface PageView {
    page_title: string;
    page_location: string;
    page_path: string;
  }

  export interface Event extends GtagEventParams {
    event_category: string;
    event_label: string;
    value: number;
  }

  export interface ScreenView {
    app_name: string;
    screen_name: string;
  }

  export interface Purchase {
    transaction_id: string;
    affiliation?: string;
    value?: number;
    tax?: number;
    shipping?: number;
    items?: GtagItem[];
    checkout_step?: number;
    checkout_option?: string;
  }

  export interface Linker {
    domains: string[];
    decorate_forms?: boolean;
    accept_incoming?: boolean;
    url_position?: "fragment" | "query";
  }

  export interface Exception {
    description: string;
    fatal: boolean;
  }

  export interface Timing {
    name: string;
    value: number;
    event_category?: string;
    event_label?: string;
  }

  export type Dictionary<T> = { [key: string]: T };

  export interface VueGtag {
    optIn(): void;
    optOut(): void;
    pageview(pageView: PageView): void;
    event(action: EventNames | string, event: Event): void;
    screenview(screenView: ScreenView): void;
    customMap(map: Dictionary<string>): void;
    purchase(puchase: Event): void;
    purchase(purchase: Purchase): void;
    linker(config: Linker): void;
    exception(ex: Exception): void;
    set(config: CustomParams): void;
    config(config?: GtagGenericParams);
    time(timing: Timing);
  }

  export interface DomainConfig {
    id: string;
    params?: GtagGenericParams & { send_page_view: boolean };
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
      Vue: typeof _Vue,
      options: PluginOptions,
      router?: VueRouter
    ): void;
  }

  export function bootstrap(): Promise<Gtag>;
  export function setOptions(PluginOptions): void;

  export default VueGtagPlugin;

  module "vue/types/vue" {
    interface Vue {
      $ga: VueGtag;
    }
  }
}
