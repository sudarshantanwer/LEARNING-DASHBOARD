import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["src/**/*.test.ts", "tests/**/*.test.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json-summary"],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 65,
        statements: 80
      },
      exclude: ["src/index.ts", "**/*.test.ts", "**/types/**", "vitest.config.ts"]
    }
  }
});
