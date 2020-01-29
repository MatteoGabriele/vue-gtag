declare module 'vue-gtag' {
  import _Vue, { PluginFunction } from 'vue';
  import VueRouter from 'vue-router';

  export interface PageView {
    page_title: string;
    page_location: string;
    page_path: string;
  }

  export interface EventParams {
    /** string that will appear as the event category */
    event_category?: string;
    /** string that will appear as the event label */
    event_label?: string;
    /** non-negative integer that will appear as the event value */
    value?: number;
    [key: string]: any;
  }

  export interface ScreenView {
    app_name: string;
    screen_name: string;
  }

  export interface Purchase {
    transaction_id: string;
    affiliation: string;
    value: number;
  }

  export interface Linker {
    domains: string[];
  }

  export interface Exception {
    description: string;
    fatal: boolean;
  }

  export type Dictionary<T> = { [key: string]: T };

  export interface VueGtag {
    pageview(pageView: PageView): void;

    /**
     * Send a Google Analytics Event.
     *
     * @see https://developers.google.com/analytics/devguides/collection/gtagjs/events
     *
     * @param action string that will appear as the event action in Google Analytics Event reports
     * @param eventParams
     */
    event(action: string, eventParams?: EventParams): void;
    screenview(screenView: ScreenView): void;
    customMap(map: Dictionary<string>): void;
    purchase(purchase: Purchase): void;
    linker(config: Linker): void;
    exception(ex: Exception): void;
  }

  export interface PluginOptions {
    appName?: string;
    pageTrackerTemplate?: () => void;
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
    includes?: any;
    config?: {
      id: string,
      params?: Dictionary<any>
    };
  }

  export class VueGtagPlugin {
    static install(Vue: typeof _Vue, options: PluginOptions, router?: VueRouter): void;
  }

  export default VueGtagPlugin;

  module 'vue/types/vue' {
    interface Vue {
      $gtag: VueGtag;
    }
  }
}
