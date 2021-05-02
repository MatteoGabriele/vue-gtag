import Vue from "vue";
import { isFn } from "@/utils";
import { getRouter } from "@/router";
import { getOptions } from "@/options";
import addConfiguration from "@/add-configuration";
import track from "@/track";

const isRouteExcluded = (route) => {
  const { pageTrackerExcludedRoutes: routes } = getOptions();
  return routes.includes(route.path) || routes.includes(route.name);
};

export default () => {
  const { onBeforeTrack, onAfterTrack } = getOptions();
  const router = getRouter();

  router.onReady(() => {
    Vue.nextTick().then(() => {
      const { currentRoute } = router;

      addConfiguration();

      if (isRouteExcluded(currentRoute)) {
        return;
      }

      track(currentRoute);
    });

    router.afterEach((to, from) => {
      Vue.nextTick().then(() => {
        if (isRouteExcluded(to)) {
          return;
        }

        if (isFn(onBeforeTrack)) {
          onBeforeTrack(to, from);
        }

        track(to, from);

        if (isFn(onAfterTrack)) {
          onAfterTrack(to, from);
        }
      });
    });
  });
};
