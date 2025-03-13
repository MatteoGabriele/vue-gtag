import path from "node:path";
import { defineConfig } from "vitest/config";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    outDir: "dist",
    lib: {
      entry: path.resolve(__dirname, "./src/index.ts"),
      name: "VueGtag",
      formats: ["es"],
      fileName: "vue-gtag",
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        exports: "named",
        globals: {
          vue: "Vue"
        },
      },
    },
    minify: 'terser',
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
    }),
  ],
  test: {
    environment: "jsdom",
    globals: true,
    mockReset: true,
    coverage: {
      reporter: ['text', 'html'],
    }
  },
});
