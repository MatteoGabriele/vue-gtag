declare module 'vue-gtag' {
  import _Vue, { PluginFunction } from 'vue';

  export interface PageView {
    page_path: string;
  }

  export interface Event {
    event_category: string;
    event_label: string;
    value: string;
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
    event(action: string, event: Event): void;
    screenview(screenView: ScreenView): void;
    customMap(map: Dictionary<string>): void;
    purchase(purchase: Purchase): void;
    linker(config: Linker): void;
    exception(ex: Exception): void;
  }

  export interface PluginOptions {
    pageTrackerTemplate?: () => void;
    onBeforeTrack?: () => void;
    onAfterTrack?: () => void;
    onReady?: () => void;
    enabled?: boolean;
    disableScriptLoad?: boolean;
    bootstrap?: boolean;
    globalObjectName?: string;
    pageTrackerEnabled?: boolean;
    pageTrackerScreenviewEnabled: boolean;
    defaultGroupName?: string;
    includes: any;
    config: any;
  }

  export class VueGtagPlugin {
    static install(Vue: typeof _Vue, options: PluginOptions): void;
  }

  export default VueGtagPlugin;

  module 'vue/types/vue' {
    interface Vue {
      $ga: VueGtag;
    }
  }
}
