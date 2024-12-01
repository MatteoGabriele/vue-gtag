type Config = {
  targetId: string;
  params?: Gtag.ControlParams | Gtag.EventParams | Gtag.ConfigParams;
};

export type Options = {
  configs: Config[];
  scriptResourceUrl: string;
  scriptPreconnectOrigin: string;
  scriptDefer: boolean;
  dataLayerName: string;
  onReady?: () => void;
  onError?: (error: unknown) => void;
};

export type PartialOptions = Partial<Options>;

let options: Options = {
  configs: [],
  scriptResourceUrl: "https://www.googletagmanager.com/gtag/js",
  scriptPreconnectOrigin: "https://www.googletagmanager.com",
  scriptDefer: true,
  dataLayerName: "gtag",
};

export const setOptions = (newOptions: PartialOptions): void => {
  options = { ...options, ...newOptions };
};

export const getOptions = (): Options => options;
