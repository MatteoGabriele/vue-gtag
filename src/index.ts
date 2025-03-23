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
import useGtagWithConsent from "./composable/use-gtag-with-consent";
import createGtag from "./create-gtag";

export {
  createGtag,
  useGtagWithConsent,
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
