import type { Router } from "vue-router";

let router: Router | undefined;

export const setRouter = (instance: Router) => {
  router = instance;
};

export const getRouter = (): Router | undefined => router;

export default router;
