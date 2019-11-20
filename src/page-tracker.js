import { Router } from "./install";
import page from "./lib/page";

export default () => {
  Router.onReady(() => {
    Router.afterEach(to => {
      page({
        page_title: to.name,
        page_path: to.fullPath,
        page_location: window.location.href
      });
    });
  });
};
