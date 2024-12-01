import event from "./event";
import pageview from "./pageview";
import query from "./query";

const api = {
  query,
  pageview,
  event,
};

export type Api = typeof api;

export default api;
