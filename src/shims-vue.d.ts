import { Api } from "src/api";

declare module "vue" {
  interface ComponentCustomProperties {
    $gtag: Api;
  }
}
