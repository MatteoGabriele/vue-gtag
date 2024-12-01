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

const defaultOptions: Options = {
  configs: [],
  scriptResourceUrl: "https://www.googletagmanager.com/gtag/js",
  scriptPreconnectOrigin: "https://www.googletagmanager.com",
  scriptDefer: true,
  dataLayerName: "gtag",
};

let options: Options = { ...defaultOptions };

export const setOptions = (newOptions: PartialOptions): void => {
  options = { ...options, ...defaultOptions, ...newOptions };
};

export const getOptions = (): Options => options;
