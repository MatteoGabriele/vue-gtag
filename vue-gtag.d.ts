declare module "vue-gtag" {
  import _Vue, { PluginFunction } from "vue";
  import VueRouter from "vue-router";

  type GtagEventParams =
    | Gtag.ControlParams
    | Gtag.EventParams
    | Gtag.CustomParams;

  export interface PageView {
    page_title: string;
    page_location: string;
    page_path: string;
  }

  export interface Event extends Gtag.EventParams {
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
    items?: Gtag.Item[];
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
    event(action: Gtag.EventNames | string, event: Event): void;
    screenview(screenView: ScreenView): void;
    customMap(map: Dictionary<string>): void;
    purchase(puchase: Event): void;
    purchase(purchase: Purchase): void;
    linker(config: Linker): void;
    exception(ex: Exception): void;
    set(config: Gtag.CustomParams): void;
    config(config?: GtagEventParams);
    time(timing: Timing);
  }

  export interface DomainConfig {
    id: string;
    params?: GtagEventParams & { send_page_view: boolean };
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

  export function bootstrap(): Promise<Gtag.Gtag>;
  export function setOptions(PluginOptions): void;

  export default VueGtagPlugin;

  module "vue/types/vue" {
    interface Vue {
      $ga: VueGtag;
    }
  }
}
