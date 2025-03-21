import type {
  RouteLocationNormalizedGeneric as VueRouterRoute,
  Router as VueRouterRouter,
} from "vue-router";
import type { LinkerParams } from "./api/linker";
import type { Pageview } from "./api/pageview";
import type { Screenview } from "./api/screenview";
import type { GtagConfig } from "./types/gtag";
import { deepMerge } from "./utils";

export type Router = VueRouterRouter;
export type Route = VueRouterRoute;

export type PageTrackerParams = Pageview | Screenview;

export type PageTrackerTemplate =
  | PageTrackerParams
  | ((route: Route) => PageTrackerParams);

export type PageTrackerExclude =
  | Array<{ path?: string; name?: string }>
  | ((route: Route) => boolean);

export type PageTracker = {
  /**
   * Vue Router instance used for tracking navigation events.
   */
  router: Router;

  /**
   * Custom template for generating route tracking events.
   */
  template?: PageTrackerTemplate;

  /**
   * Use `screen_view` instead of the default `page_view` event.
   * @default false
   */
  useScreenview?: boolean;

  /**
   * Prevent tracking consecutive route changes with the same path.
   * @default false
   */
  skipSamePath?: boolean;

  /**
   * Defines routes to exclude from tracking.
   * - Can be an array of route objects identified by `path` or `name`.
   * - Can also be a function that returns `true` to exclude the route from tracking.
   */
  exclude?: PageTrackerExclude;

  /**
   * Set `send_page_view` for each route change.
   * @default true
   */
  sendPageView?: boolean;

  /**
   * Use the router base path option
   */
  useRouterBasePath?: boolean;

  /**
   * Sets the `page_path` equal to the route `fullPath` instead of `path` property
   */
  useRouteFullPath?: boolean;
};

export type Hooks = {
  /**
   * Triggered before a route tracking event is fired.
   * @param route - The current route being tracked.
   */
  "router:track:before"?: (route: Route) => void;

  /**
   * Triggered after a route tracking event is fired.
   * @param route - The current route that was tracked.
   */
  "router:track:after"?: (route: Route) => void;

  /**
   * Triggered before the initial configuration request is sent.
   */
  "config:init:before"?: () => void;

  /**
   * Triggered after the initial configuration request is sent.
   */
  "config:init:after"?: () => void;

  /**
   * Called when the gtag.js script successfully loads.
   */
  "script:loaded"?: () => void;

  /**
   * Called when the gtag.js script fails to load.
   * @param error - The error encountered during script loading.
   */
  "script:error"?: (error: unknown) => void;
};

export type Resource = {
  /**
   * URL of the gtag.js script.
   * @default "https://www.googletagmanager.com/gtag/js"
   */
  url?: string;

  /**
   * Enable preconnecting to the script's domain for faster loading.
   * @default false
   */
  preconnect?: boolean;

  /**
   * Load the script with the `defer` attribute.
   * @default false
   */
  defer?: boolean;

  /**
   * A nonce value for the script tag, useful for enforcing Content Security Policy (CSP).
   */
  nonce?: string;
};

export type TagId = string;

export type Settings = {
  /**
   * Primary Google Tag Manager or Google Analytics tag ID.
   */
  tagId?: TagId;

  /**
   * Configuration settings for the main `tagId`.
   */
  config?: GtagConfig;

  /**
   * Additional tag IDs and their configurations to be tracked alongside the main `tagId`.
   */
  additionalAccounts?: Array<{ tagId: TagId; config?: GtagConfig }>;

  /**
   * Configuration for loading the gtag.js script.
   */
  resource: Resource;

  /**
   * Custom global variable name for the data layer.
   * @default "dataLayer"
   */
  dataLayerName: string;

  /**
   * Custom global function name for `gtag`.
   * @default "gtag"
   */
  gtagName: string;

  /**
   * Settings for automatic route tracking.
   */
  pageTracker?: PageTracker;

  /**
   * Configuration for cross-domain tracking.
   */
  linker?: LinkerParams;

  /**
   * Custom analytics group name.
   * @default "default"
   */
  groupName: string;

  /**
   * Collection of lifecycle hooks and event callbacks for tracking and configuration.
   */
  hooks?: Hooks;

  /**
   * Default consent mode applied during initialization.
   */
  consentMode?: "denied" | "granted";

  /**
   * Default value for `app_name` when using the `screen_view` tracking method.
   */
  appName?: string;
};

const defaultSettings: Readonly<Settings> = {
  resource: { url: "https://www.googletagmanager.com/gtag/js" },
  dataLayerName: "dataLayer",
  gtagName: "gtag",
  groupName: "default",
};

let settings: Settings = { ...defaultSettings };

export function getSettings(): Settings {
  return settings;
}

export function resetSettings(): void {
  settings = { ...defaultSettings };
}

export function updateSettings(configParams: Partial<Settings>): void {
  settings = deepMerge(settings, configParams);
}
