import { defineConfig } from "vitest/config";

const config = defineConfig({
  test: {
    include: ["./src/**/*.test.js"],
  },
});

export default config;
