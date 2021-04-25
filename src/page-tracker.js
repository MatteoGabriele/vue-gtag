import { getRouter } from "@/router";
import * as api from "@/api";

const pageTracker = () => {
  const router = getRouter();

  router.onReady(() => {
    api.config();
  });
};

export default pageTracker;
