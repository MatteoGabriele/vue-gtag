import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "dist",
    lib: {
      entry: path.resolve(__dirname, "./src/index.js"),
      name: "VueGtag",
      formats: ["umd", "es", "cjs"],
      fileName: (format) => `vue-gtag.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        exports: "named",
        globals: {
          vue: "vue",
        },
      },
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
  },
});
