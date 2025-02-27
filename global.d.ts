import type { Settings } from "@/settings";

declare global {
  interface Window {
    // biome-ignore lint/suspicious/noExplicitAny:
    [key: string]: any | any[];
  }
}
