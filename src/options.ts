import { Router } from "./router";

export type OptionsConfig = {
  targetId: string;
  params?: Gtag.ControlParams | Gtag.EventParams | Gtag.ConfigParams;
};

export type Options = {
  configs: OptionsConfig[];
  scriptResourceUrl: string;
  scriptPreconnectOrigin: string;
  scriptDefer: boolean;
  dataLayerName: string;
  onReady?: () => void;
  onError?: (error: unknown) => void;
  router?: Router;
  routerTrackFullPath?: boolean;
  routerTrackPrependBase?: boolean;
};

export type PartialOptions = Partial<Options>;

const defaultOptions: Options = {
  configs: [],
  scriptResourceUrl: "https://www.googletagmanager.com/gtag/js",
  scriptPreconnectOrigin: "https://www.googletagmanager.com",
  scriptDefer: true,
  dataLayerName: "gtag",
};

export let options: Readonly<Options> = { ...defaultOptions };

export const setOptions = (newOptions: PartialOptions): void => {
  options = Object.assign({}, defaultOptions, newOptions);
};
