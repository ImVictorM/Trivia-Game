import { coverageConfigDefaults, defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "src/tests/setup.ts",
    coverage: {
      exclude: [
        ...coverageConfigDefaults.exclude,
        "**/locales/**",
        "**/services/**",
        "**/style.*",
        "**/styles/**",
      ],
    },
  },
});
