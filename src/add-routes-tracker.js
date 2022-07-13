import { nextTick } from "vue";
import { isFunction } from "@vue/shared";
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

  router.isReady().then(() => {
    nextTick().then(() => {
      const { currentRoute } = router;

      addConfiguration();

      trackRoute(currentRoute.value);
    });

    router.afterEach((to, from) => {
      nextTick().then(() => trackRoute(to, from));
    });
  });

  function trackRoute(to, from) {
    if (isRouteExcluded(to)) {
      return;
    }

    if (isFunction(onBeforeTrack)) {
      onBeforeTrack(to, from);
    }

    track(to, from);

    if (isFunction(onAfterTrack)) {
      onAfterTrack(to, from);
    }
  }
};
