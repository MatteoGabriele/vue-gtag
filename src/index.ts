import addGtag from "./add-gtag";
import config from "./api/config";
import { consent, consentDeniedAll, consentGrantedAll } from "./api/consent";
import customMap from "./api/custom-map";
import ecommerce from "./api/ecommerce";
import event from "./api/event";
import exception from "./api/exception";
import linker from "./api/linker";
import { optIn, optOut } from "./api/opt";
import pageview from "./api/pageview";
import query from "./api/query";
import screenview from "./api/screenview";
import set from "./api/set";
import time from "./api/time";
import { type Settings, updateSettings } from "./settings";

type CreateGtagSettings = Partial<Settings> & Required<Pick<Settings, "tagId">>;

export function createGtag(settings: CreateGtagSettings) {
  updateSettings(settings);
  addGtag();
}

export {
  config,
  event,
  linker,
  pageview,
  ecommerce,
  query,
  screenview,
  time,
  set,
  exception,
  customMap,
  consent,
  consentDeniedAll,
  consentGrantedAll,
  optIn,
  optOut,
};
