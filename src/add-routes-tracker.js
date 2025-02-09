import addConfiguration from "@/add-configuration";
import { getOptions } from "@/options";
import { getRouter } from "@/router";
import track from "@/track";
import { isFn } from "@/utils";
import { nextTick } from "vue";

const isRouteExcluded = (route) => {
  const { pageTrackerExcludedRoutes: routes } = getOptions();
  return routes.includes(route.path) || routes.includes(route.name);
};

export default () => {
  const { onBeforeTrack, onAfterTrack } = getOptions();
  const router = getRouter();

  router.isReady().then(() => {
    nextTick().then(() => {
      const { currentRoute } = router;

      addConfiguration();

      if (isRouteExcluded(currentRoute.value)) {
        return;
      }

      track(currentRoute.value);
    });

    router.afterEach((to, from) => {
      nextTick().then(() => {
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
