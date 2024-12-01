import { options } from "src/options";
import api from "src/api";

export type Route = import("vue-router").RouteLocationNormalizedGeneric;

export const trackRoute = (to: Route | null, from?: Route | null) => {
  if (to == null || to.path === from?.path) {
    return;
  }

  api.pageview(to);
};

export const addRoutesTracker = async () => {
  const { router } = options;

  if (!router) {
    return;
  }

  await router.isReady();

  trackRoute(router.currentRoute.value);

  router.afterEach((to, from) => {
    trackRoute(to, from);
  });
};
