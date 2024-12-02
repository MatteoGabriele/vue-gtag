import { Router } from "./router";

export type Config = {
  targetId: string;
  params?: Gtag.ControlParams | Gtag.EventParams | Gtag.ConfigParams;
};

export type RouterOptions = {
  useFullPath?: boolean;
  prependBase?: boolean;
};

export type Options = {
  configs: Config[];
  scriptResourceUrl: string;
  scriptPreconnectOrigin: string;
  scriptDefer: boolean;
  dataLayerName: string;
  globalObjectName: string;
  router?: Router;
  routerOptions?: RouterOptions;
  onReady?: () => void;
  onError?: (error: unknown) => void;
  debug?: boolean;
};

export type PartialOptions = Partial<Options>;

const defaultOptions: Options = {
  configs: [],
  scriptResourceUrl: "https://www.googletagmanager.com/gtag/js",
  scriptPreconnectOrigin: "https://www.googletagmanager.com",
  scriptDefer: true,
  dataLayerName: "dataLayer",
  globalObjectName: "gtag",
};

export let options: Readonly<Options> = { ...defaultOptions };

export const setOptions = (newOptions: PartialOptions): void => {
  options = Object.assign({}, defaultOptions, newOptions);
};
