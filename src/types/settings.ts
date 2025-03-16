import type { LinkerParams } from "../api/linker";
import type { PageTrackerParams } from "./page-tracker";
import type { Route, Router } from "./router";

export type ConfigParams =
  | Gtag.ControlParams
  | Gtag.EventParams
  | Gtag.ConfigParams
  | Gtag.CustomParams;

export type PageTrackerTemplate =
  | PageTrackerParams
  | ((route: Route) => PageTrackerParams);

export type PageTracker = {
  /** VueRouter router instance */
  router: Router;
  /** Create a custom template for automatic route tracking */
  template?: PageTrackerTemplate;
  /** Use `screen_view` event. Default is `page_view` */
  useScreenview?: boolean;
  /** Pass the name of the app. Only available when useScreenview is set to true */
  appName?: string;
  /** Avoid traking route changes triggerd by the same path */
  skipSamePath?: boolean;
  /** Exclude routes using either the route `path` or `name` property */
  exclude?: Array<{ path?: string; name?: string }>;
  /** Event fired before the route tracking is fired */
  onBeforeTrack?: (route: Route) => void;
  /** Event fired after the route tracking is fired */
  onAfterTrack?: (route: Route) => void;
};

export type Resource = {
  /** The URL pointing to gtag.js script. Default value is `https://www.googletagmanager.com/gtag/js` */
  url?: string;
  /** Preconnect to the resource url domain. Default value is `false` */
  preconnect?: boolean;
  /** Defer script loading. Default value is `false` */
  deferred?: boolean;
};

export type TagId = string;

export type Settings = {
  /** The tag ID value */
  tagId?: TagId;
  /** The initial configuration attached to the `tagId` value */
  config?: ConfigParams;
  /** An array of additional tag IDs and configurations that will be triggered with the main `tagId` value */
  additionalAccounts?: Array<{ tagId: TagId; config?: ConfigParams }>;
  /** gtag.js loader configuration */
  resource: Resource;
  /** Custom dataLayer global name. Default is `dataLayer` */
  dataLayerName: string;
  /** Custom gtag global name. Default is `gtag` */
  gtagName: string;
  /** Routes tracking configuration */
  pageTracker?: PageTracker;
  /** Callback fired when the gtag.js library is loaded and first hit configuration is fired */
  onReady?: () => void;
  /** Callback fired when the gtag.js library fails to load */
  onError?: (error: unknown) => void;
  /** Set up cross-domain linking */
  linker?: LinkerParams;
  /** Define custom group name. Default is `default` */
  groupName: string;
  /** In case you are already loading gtag.js yourself, you can pass true to avoid adding the script again */
  useCustomScript?: boolean;
};
