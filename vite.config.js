import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    mockReset: true,
    coverage: {
      reporter: ['text', 'html'],
    }
  },
});
