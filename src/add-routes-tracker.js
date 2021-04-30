import Vue from "vue";
import { isFn } from "@/utils";
import { getRouter } from "@/router";
import { getOptions } from "@/options";
import addConfiguration from "@/add-configuration";
import track from "@/track";

export default () => {
  const { onBeforeTrack, onAfterTrack } = getOptions();
  const router = getRouter();

  router.onReady(() => {
    Vue.nextTick().then(() => {
      addConfiguration();
      track(router.currentRoute);
    });

    router.afterEach((to, from) => {
      Vue.nextTick().then(() => {
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
