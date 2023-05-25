import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vitest/config";
import tsconfigPaths from 'vite-tsconfig-paths';
import { loadEnv } from 'vite'
// @ts-ignore
// We're being cheeky to avoid Vite problem with env files
import * as envVars from './.env.ts';

const define: Record<string, string | undefined> = {}
for (const [key, value] of Object.entries(envVars)) {
  define[`process.env.${key}`] = JSON.stringify(value)
}

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./test/setup.ts",
  },
});

