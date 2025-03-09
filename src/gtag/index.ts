import config from "@/gtag/config";
import event from "@/gtag/event";
import linker from "@/gtag/linker";
import pageview from "@/gtag/pageview";
import purchase from "@/gtag/purchase";
import query from "@/gtag/query";
import refund from "@/gtag/refund";
import screenview from "@/gtag/screenview";
import time from "@/gtag/time";

const api = {
  config,
  screenview,
  pageview,
  query,
  time,
  event,
  refund,
  purchase,
  linker,
};

export type UseGtagReturn = typeof api;

export function useGtag(): UseGtagReturn {
  return api;
}
