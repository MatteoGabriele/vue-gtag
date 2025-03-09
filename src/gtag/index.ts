import config from "./config";
import pageview from "./pageview";
import query from "./query";
import screenview from "./screenview";

const api = {
  config,
  screenview,
  pageview,
  query,
};

export type UseGtagReturn = typeof api;

export function useGtag(): UseGtagReturn {
  return api;
}
