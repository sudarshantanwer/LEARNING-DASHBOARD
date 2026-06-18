import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

/** Dev/preview: proxy `/api` → API (default **4010**). Override with `API_PROXY_PORT` / `VITE_API_PORT`; server must use matching `PORT`. */
const apiPort = Number(process.env.API_PROXY_PORT ?? process.env.VITE_API_PORT ?? 4010);
const apiProxy = {
  "/api": {
    target: `http://127.0.0.1:${apiPort}`,
    changeOrigin: true
  }
} as const;

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: apiProxy
  },
  preview: {
    port: 4173,
    proxy: apiProxy
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/tests/setup.ts",
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json-summary"],
      all: false,
      include: ["src/**/*.{ts,tsx}"],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 75,
        statements: 80
      },
      exclude: ["src/main.tsx", "src/vite-env.d.ts", "src/tests/**", "**/*.test.*", "src/types/**"]
    }
  }
});
