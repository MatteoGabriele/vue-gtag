import { nextTick } from "vue";
import { isFn } from "src/utils";
import { getRouter } from "src/router";
import { getOptions } from "src/options";
import addConfiguration from "src/add-configuration";
import track from "src/track";

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
