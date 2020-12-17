import {
  setOptions as _setOptions,
  install,
  setRouter as _setRouter,
} from "./install";
import _bootstrap from "./bootstrap";
import api from "./api";

export default install;
export { install };

export const bootstrap = _bootstrap;
export const setOptions = _setOptions;
export const setRouter = _setRouter;

// export api for usages outside Vuejs context
export const query = api.query;
export const config = api.config;
export const event = api.event;
export const pageview = api.pageview;
export const screenview = api.screenview;
export const customMap = api.customMap;
export const time = api.time;
export const exception = api.exception;
export const linker = api.linker;
export const purchase = api.purchase;
export const set = api.set;
export const optIn = api.optIn;
export const optOut = api.optOut;
export const refund = api.refund;
