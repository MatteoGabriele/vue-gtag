import { defineConfig } from "vitest/config";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: { entry: resolve(__dirname, "src/index.ts"), formats: ["es"] },
  },
  resolve: {
    alias: { src: resolve("src/") },
  },
  test: {
    globals: true,
    restoreMocks: true,
    environment: "happy-dom",
    coverage: {
      exclude: ["*.config.*", "*.d.ts"],
    },
  },
});
