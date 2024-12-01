import { defineConfig } from "vitest/config";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es"],
      fileName: "vue-gtag",
    },
  },

  resolve: {
    alias: {
      src: resolve("src/"),
    },
  },

  plugins: [
    dts({
      rollupTypes: true,
      tsconfigPath: "./tsconfig.json",
    }),
  ],

  test: {
    globals: true,
    restoreMocks: true,
    include: ["**/__tests__/*.{js,tsx,ts}"],
    environment: "jsdom",
    coverage: {
      exclude: ["*.config.*", "*.d.ts"],
    },
  },
});
